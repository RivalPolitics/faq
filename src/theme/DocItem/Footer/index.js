import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import TagsListInline from "@theme/TagsListInline";
import EditMetaRow from "@theme/EditMetaRow";
export default function DocItemFooter() {
  const { metadata } = useDoc();
  const { editUrl, lastUpdatedAt, lastUpdatedBy, tags } = metadata;
  const canDisplayTagsRow = tags.length > 0;
  const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);
  const canDisplayFooter = canDisplayTagsRow || canDisplayEditMetaRow;
  if (!canDisplayFooter) {
    return null;
  }
  return (
    <footer
      className={clsx(ThemeClassNames.docs.docFooter, "docusaurus-mt-lg")}
    >
      <div className="text-[15px] border-t-[1px] border-solid border-gray-300 border-x-0 border-b-0 mt-3 pt-3 text-gray-600 pl-2">
        С уважением, администрация Rival Politics &#x2022;{" "}
        <a href="https://github.com/RivalPolitics/faq/issues/new">
          по любым ошибкам сообщите сюда
        </a>
        {canDisplayTagsRow && (
          <div
            className={clsx(
              "row margin-top--sm",
              ThemeClassNames.docs.docFooterTagsRow
            )}
          >
            <div className="col">
              <TagsListInline tags={tags} />
            </div>
          </div>
        )}
      </div>
      {/*{canDisplayTagsRow && (
        <div
          className={clsx(
            'row margin-top--sm',
            ThemeClassNames.docs.docFooterTagsRow,
          )}>
          <div className="col">
            <TagsListInline tags={tags} />
          </div>
        </div>
      )}
      {canDisplayEditMetaRow && (
        <EditMetaRow
          className={clsx(
            'margin-top--sm',
            ThemeClassNames.docs.docFooterEditMetaRow,
          )}
          editUrl={editUrl}
          lastUpdatedAt={lastUpdatedAt}
          lastUpdatedBy={lastUpdatedBy}
        />
      )}*/}
    </footer>
  );
}
