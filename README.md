# Winston's Portfolio 95
Explore my portfolio by visiting this [link](https://winstonsportfolio95.netlify.app/). The unique aesthetic of this portfolio is achieved through the integration of `React95`, providing Windows95 UI components for React applications, and `react-draggable`, enabling element drag-and-drop functionality.

## Draggable Components on Touchscreens
While building this portfolio, I explored the complexities of CSS and ReactJS, deepening my understanding and honing my skills. One particularly challenging task was enabling both parent and child components to be draggable. Although the functionality works smoothly with a traditional computer mouse, it didn’t perform as expected on touchscreens. To overcome this, I devised a workaround using a separate element to track the parent’s movement. By duplicating the child’s content to follow the parent, I ensured a smoother dragging experience for touchscreen users.

```
binContent.style.top = `${scrollTop + binWindowRect.top}px`;
binContent.style.left = `${scrollLeft + binWindowRect.left}px`;
```
The scroll position (`scrollTop` and `scrollLeft`) is used to account for the current view of the app, ensuring that the position of `binContent` is correctly adjusted relative to the scrolled viewport. The combination of the scroll position and the `binWindow`'s position (`binWindowRect.top` and `binWindowRect.left`) provides the correct absolute position for binContent.

## `event.stopPropagation()` and `event.preventDefault()`
These two methods play a crucial role in achieving a smooth drag-and-drop functionality. `event.stopPropagation()` is utilized to stop the propagation of events up or down the `DOM` hierarchy. On the other hand, `event.preventDefault()` serves the purpose of preventing the default action associated with an event. By employing these methods, we can manipulate event behaviors to ensure a seamless and controlled drag-and-drop experience. These techniques are instrumental in customizing the interaction and enhancing user experience during drag-and-drop operations. 

## `prevState`
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
Using `prevState` can help avoid unnecessary creation of a new set in React state updates. When you are working with a set state in React and need to update it based on the previous state, you can use the functional form of `setState` to ensure that you are working with the latest state.


## Stacking Order Control with `zIndex`
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


`getBoundingClientRect()`, `event.clientX || event.changedTouches[0].clientX` and `event.clientY || event.changedTouches[0].clientY`

## Addressing Animation Issues on Mobile
I also encountered an issue with the useSpring scrolling animation for the music window. I notice that if I view the portfolio with the music window open on my mobile device, when I drag the browser, the music window would blink. I knew it must be caused by the scrolling animation, so I did some research about how to pause the useSpring animation when touchmove.


`api.transform.pause()` when `touchmove`

## Challenges with `window.confirm()` and `draggable-react` Interaction
I noticed an issue where, with the `window.confirm` open, the app continued to interpret touch behavior as active. This resulted in icons teleporting if I attempted to drag another icon immediately after canceling the confirmation box. Despite trying to control the behavior using `[isDragging, setIsDragging]` in conjunction with `onStart()` and `onStop()` from `draggable-react`, the problem was mitigated but not solved completely. Handling the touchmove event and prevent default behavior by adding and removing event listeners still didn't yield the desired outcome either. Eventually, I discovered that I could use `setTimeout` to interrupt the touch behavior, but I'm open to more optimal solutions. If you have any insights, please feel free to share!

## `useImperativeHandle` and `forwardRef`
While troubleshooting the music app in my portfolio another day, Upon reopening the app, I noticed a delay in resetting the text-scrolling effect. The delay stemmed from passing state between parent and child components, managed through useEffect. Aware of this latency, I delved into self-learning and discovered forwardRef and useImperativeHandle. These React hooks offer a direct communication channel between parent and child components, eliminating delays associated with prop-state passage. Particularly useful for exposing specific functions or values from child to parent, this method provides immediate interaction and precise control over the child component's behavior. The approach optimizes performance, making it ideal for scenarios requiring efficient communication and enhanced responsiveness.

```
useImperativeHandle(ref, () => {
  return {
    resume() { scrollingTransform.resume() },
    pause() { scrollingTransform.pause() },
    reset() { scrollingTransform.reset() },
  }
}, [])
```

## `useCallback` and `memo`
To minimise unnecessary re-renders of components, I turned to W3Schools to learn about the benefits of useCallback. By placing console logs within my components, I can identify instances of re-rendering. Upon detection, I leverage useCallback to memoize functions where necessary. This approach not only helps in preventing avoidable re-renders but also contributes to the overall performance improvement of my portfolio application.

![JS heap size](https://github.com/loudringphone/portfolio95/assets/112668237/a31cfaee-50f8-439a-a52c-af7294221193)

I assessed the performance using Chrome's developer tools.
Not sure if that is the best way to check but I can see that after using useCallback, the size has dropped a little bit.

## Job Inquiries
Feel free to explore the portfolio and contact me for any junior role available! Getting a job is harder than I thought before I enrolled in the software development course. I believe I have done everything I can, including drafting a good cover letter and a good resume and building a strong portfolio. Despite my efforts, I have only had one phone interview since completing the course!
