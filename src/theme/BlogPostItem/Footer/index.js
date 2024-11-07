import React from "react";
import clsx from "clsx";
import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import { ThemeClassNames } from "@docusaurus/theme-common";
import EditMetaRow from "@theme/EditMetaRow";
import TagsListInline from "@theme/TagsListInline";
import ReadMoreLink from "@theme/BlogPostItem/Footer/ReadMoreLink";
import { useEffect } from "react";
import siteConfig from "@generated/docusaurus.config";

import "gitalk/dist/gitalk.css";
import Gitalk from "gitalk";

export default function BlogPostItemFooter() {
  const { metadata, isBlogPostPage } = useBlogPost();
  const {
    tags,
    title,
    editUrl,
    hasTruncateMarker,
    lastUpdatedBy,
    lastUpdatedAt,
  } = metadata;
  // A post is truncated if it's in the "list view" and it has a truncate marker
  const truncatedPost = !isBlogPostPage && hasTruncateMarker;
  const tagsExists = tags.length > 0;
  const renderFooter = tagsExists || truncatedPost || editUrl;
  if (!renderFooter) {
    return null;
  }
  // BlogPost footer - details view
  if (isBlogPostPage) {
    const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);

    console.log(siteConfig.clientID, siteConfig.clientSecret, siteConfig);

    useEffect(() => {
      const gitalk = new Gitalk({
        clientID: siteConfig.clientID,
        clientSecret: siteConfig.clientSecret,
        repo: "faq",
        owner: "RivalPolitics",
        admin: ["RivalPolitics"],
        id: metadata.permalink, // Используем уникальный идентификатор для каждого поста
        distractionFreeMode: true, // Включение простого интерфейса
        language: ["ru"],
      });

      gitalk.render("gitalk-container");
    }, [metadata.permalink]);

    return (
      <footer className="docusaurus-mt-lg">
        <div className="text-[15px] border-t-[1px] border-solid border-gray-300 border-x-0 border-b-0 mt-3 pt-3 text-gray-600 pl-2">
          С уважением, администрация Rival Politics &#x2022;{" "}
          <a href="https://github.com/RivalPolitics/faq/issues/new">
            по любым ошибкам сообщите сюда
          </a>
          {tagsExists && (
            <div
              className={clsx(
                "row",
                "margin-top--sm",
                ThemeClassNames.blog.blogFooterEditMetaRow
              )}
            >
              <div className="col">
                <TagsListInline tags={tags} />
              </div>
            </div>
          )}
          {canDisplayEditMetaRow && (
            <EditMetaRow
              className={clsx(
                "margin-top--sm",
                ThemeClassNames.blog.blogFooterEditMetaRow
              )}
              lastUpdatedAt={lastUpdatedAt}
              lastUpdatedBy={lastUpdatedBy}
            />
          )}
          <div id="gitalk-container" style={{ marginTop: "2rem" }} />
        </div>
      </footer>
    );
  }
  // BlogPost footer - list view
  else {
    return (
      <footer className="row docusaurus-mt-lg">
        {tagsExists && (
          <div className={clsx("col", { "col--9": truncatedPost })}>
            <TagsListInline tags={tags} />
          </div>
        )}
        {truncatedPost && (
          <div
            className={clsx("col text--right", {
              "col--3": tagsExists,
            })}
          >
            <ReadMoreLink blogPostTitle={title} to={metadata.permalink} />
          </div>
        )}
      </footer>
    );
  }
}
