import Head from 'next/head';
import contentMapper from '../layouts/contentMapper';
import { fetchPage } from '../lib/fetchPage';
import { fetchCards } from '../lib/fetchCards';
import { getNavigationList } from '../lib/getNavigationList';
import { componentMapper } from '../lib/componentMapper';
import { processCard } from '../lib/processCard';
import { fetchFooter } from '../lib/fetchFooter';

/**
 *
 * @type {import('next').GetStaticProps}
 */
export const getStaticProps = async ({ locale }) => {
  const rawCards = fetchCards(locale);
  const cardTasks = rawCards.map(async (card) => {
    return processCard(card, rawCards);
  });
  const cards = await Promise.all(cardTasks);

  const page = fetchPage(locale, 'cards');

  const contentList = page.data['layout_list']?.map((layout) =>
    componentMapper(layout, cards),
  );

  const headInfo = {
    title: {
      en: `OpenStarTerVillage - Card Introduction`,
      'zh-tw': `開源星手村 - 卡片介紹`,
    },
  };

  const navigation = await getNavigationList(locale);
  const header = {
    navigation,
  };
  const footer = fetchFooter(locale);
  const layout = {
    header,
    footer,
  };

  return {
    props: {
      headInfo: {
        title: headInfo.title[locale],
        description: '',
      },
      page: {
        contentList,
      },
      layout,
    },
  };
};

const cards = ({ headInfo, page }) => {
  return (
    <>
      <Head>
        <title>{headInfo.title}</title>
        <meta name="description" content={headInfo.description} />
      </Head>
      {page.contentList?.map(contentMapper)}
    </>
  );
};

export default cards;
