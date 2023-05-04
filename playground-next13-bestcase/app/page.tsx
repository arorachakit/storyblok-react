import {
  getStoryblokApi,
  StoryblokComponent,
  StoryblokClient,
  ISbStoriesParams,
} from "@storyblok/react/rsc";

import StoryblokStory from "@storyblok/react/story";

import { headers } from 'next/headers';

export default async function Home() {
  const { data } = await fetchData();
  const headersList = headers();
  const header_url = headersList.get('x-url') // coming from middleware

  if(header_url.includes('_storyblok_tk')){ // if inside visual using StoryblokStory
    return (
      <div>
      <h1>Live Editing</h1>
      <StoryblokStory story={data.story} /> 
      </div>
    )
  } else { // If outside Visual Editor or on Prod using StoryblokComponent
    return (
      <div>
        <h1>Story: Server Side</h1>
        <StoryblokComponent blok={data.story.content} />
      </div>
    );
  }
}

export async function fetchData() {
  const headersList = headers();
  const header_url = headersList.get('x-url') // using url to check if insde Visual Editor and fetching different versions of data
  let sbParams: ISbStoriesParams = { version: header_url.includes('_storyblok_tk') ? "draft" : "published" };

  const storyblokApi: StoryblokClient = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/home`, sbParams);
}
