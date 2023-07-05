"use client";

import React, { forwardRef } from "react";
import { useStoryblokState } from "./common/client";
import StoryblokComponent from "./common/storyblok-component";
import { ISbStoryData } from "./types";

interface StoryblokStoryProps {
  story: ISbStoryData;
  [key: string]: unknown;
}

const StoryblokStory = forwardRef<HTMLElement, StoryblokStoryProps>(
  ({ story, ...restProps }, ref) => {
    if (typeof story.content === "string") {
      story.content = JSON.parse(story.content);
    }
    story = useStoryblokState(story);
    return <StoryblokComponent ref={ref} blok={story.content} {...restProps} />;
  }
);

export default StoryblokStory;
