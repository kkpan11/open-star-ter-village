import { componentMapper } from '../../lib/service/PageContentService/componentMapper';
import contentMapper from '../../layouts/contentMapper';

const PagePreview = ({ entry, assetsByLocale, locale }) => {
  const assets = assetsByLocale[locale];

  const layoutList = entry.getIn(['data', 'layout_list']);
  const sections = layoutList?.map((layout) => {
    const component = componentMapper(layout.toJS(), assets.cards);
    return contentMapper(component);
  });
  return <div>{sections}</div>;
};

export default PagePreview;
