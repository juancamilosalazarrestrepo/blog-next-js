import * as React from "react";
import useSWR from "swr";

import Fetcher from "lib/fetcher";

export default function ViewsCounter({ slug }: { slug: string }): JSX.Element {
  const { data } = useSWR(`/api/views/${slug}`, Fetcher);
  const views = (data as unknown as Record<string, number>)?.total;

  React.useEffect(() => {
    const registerView = (): Promise<Response> => {
      return fetch(`/api/views/${slug}`, {
        method: "POST",
      });
    };
    registerView();
  }, [slug]);

  return <>{views ? views : "---"} views</>;
}
