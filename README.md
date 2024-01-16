# Winston's Portfolio 95
Explore my portfolio by visiting this [link](https://winstonsportfolio95.netlify.app/). The unique aesthetic of this portfolio is achieved through the integration of `React95`, providing Windows95 UI components for React applications, and `react-draggable`, enabling element drag-and-drop functionality.

## Draggable Components on Touchscreens
Throughout the development of this portfolio, I delved into the intricacies of CSS and ReactJS, gaining valuable insights and refining my skills. One challenge involved making both the parent and child components draggable. While this functionality works seamlessly on a traditional computer mouse, it may not function as expected on touchscreens. To address this, I implemented a workaround involving a separate element that tracks the parent's movement, duplicating the content of the child to follow suit and ensuring a smooth dragging experience on touchscreens.


`setCursorPosition` when dragging window to get track the values of `getBoundingClientRect()`


## prevState
`prevState` is a parameter representing the previous state of the component. It's often used in the functional form of setState, where you provide a callback function. The callback receives the previous state as an argument and returns the new state. Below is an example of how I make use of `prevState`:

```
const pickingIcon = (icon) => {
  if (iconIndices[icon] == maxIconIndex) {
    setIconIndices(prevState => {
      prevState[icon] = 99
      return prevState;
    })
    return
  } else {
    setIconIndices(prevState => {
      const sortedKeys = Object.keys(prevState).sort((a, b) => prevState[a] - prevState[b]);
      const iconIndex = sortedKeys.indexOf(icon);
      for (let i = iconIndex + 1; i < sortedKeys.length; i++) {
        prevState[sortedKeys[i]] -= 1;
      }
      prevState[icon] = 99;
      return prevState;
    });
  }
}
```
Using prevState can help avoid unnecessary creation of a new set in React state updates. When you are working with a set state in React and need to update it based on the previous state, you can use the functional form of setState to ensure that you are working with the latest state.


## Stacking Order Control with Z-Index
An intriguing revelation in this process was the use of z-index to control the stacking order of positioned elements. While this property influences the stacking order among children and their parent within the same stacking context, it doesn't impact the stacking order of sibling elements.

## Disabling Drag-Down-to-Refresh on Touchscreens
Another challenge I encountered was to disable the "drag-down-to-refresh" functionality on touch screens in web browsers. This involved overcoming technical hurdles to create a more seamless user experience without the interference of unintentional page refreshing.


`documentPosition === 0 && touchEndY > touchStartY ? event.preventDefault() : null;`

## Enhanced User Interaction with Transparent Overlays
To safeguard against direct user interaction with the iframe unless it occupies the top position in the stacking order, I implemented a solution. I introduced an additional element with the same width and height, positioned absolutely, and featuring a transparent background. This supplementary element serves as a protective cover for the iframe, allowing user interactions only when the iframe's z-index is at the forefront. This preventive measure ensures a focused and controlled user experience, preventing unintended interactions with the iframe when it's not in focus.

Similarly, I employ a similar technique to cover the icon elements, each consisting of both an icon image and accompanying text. By treating the icon image and text as an integral unit, this approach adds an extra layer of control, contributing to an enhanced overall user experience.


`position: absolute; top: 0; z-index: 99; height: 100%; width: 100%; background-color: transparent;`

## Preserving Icon Positions with Precision
In addition, I worked on enhancing user interaction within my application. Specifically, I implemented a feature that preserves the position of an icon when dragged from the Recycle Bin back to the Desktop. This required understanding how to duplicate an icon and accurately replicate its position. As a result, upon returning an icon to the Desktop from the Recycle Bin, it will be precisely positioned at the last point of interaction. This attention to detail is aimed at creating a more user-friendly and responsive interface for an enjoyable user experience.


`getBoundingClientRect()`, `event.changedTouches[0].clientX || event.changedTouches[0].clientX` and `event.clientY || event.changedTouches[0].clientY`

## Addressing Animation Issues on Mobile
I also encountered an issue with the useSpring scrolling animation for the music window. I notice that if I view the portfolio with the music window open on my mobile device, when I drag the browser, the music window would blink. I knew it must be caused by the scrolling animation, so I did some research about how to pause the useSpring animation when touchmove.


`api.transform.pause()` when `touchmove`


## Challenges with window.confirm and draggable-react Interaction
I noticed an issue where, with the `window.confirm` open, the app continued to interpret touch behavior as active. This resulted in icons teleporting if I attempted to drag another icon immediately after canceling the confirmation box. Despite trying to control the behavior using `[isDragging, setIsDragging]` in conjunction with `onStart()` and `onStop()` from `draggable-react`, the problem was mitigated but not solved completely. Handling the touchmove event and prevent default behavior by adding and removing event listeners still didn't yield the desired outcome either. Eventually, I discovered that I could use `setTimeout` to interrupt the touch behavior, but I'm open to more optimal solutions. If you have any insights, please feel free to share!


## Job Inquiries
Feel free to explore the portfolio and contact me for any junior role available! Getting a job is harder than I thought before I enrolled in the software development course. I believe I have done everything I can, including drafting a good cover letter and a good resume and building a strong portfolio. Despite my efforts, I have only had one phone interview since completing the course!
