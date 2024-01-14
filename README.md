# Winston's Portfolio 95
Explore my portfolio by visiting this [link](https://winstonsportfolio95.netlify.app/). The unique aesthetic of this portfolio is achieved through the integration of React95, providing Windows95 UI components for React applications, and react-draggable, enabling element drag-and-drop functionality.

## Drag-and-Drop
Throughout the development of this portfolio, I delved into the intricacies of CSS and ReactJS, gaining valuable insights and refining my skills. One challenge involved making both the parent and child components draggable. While this functionality works seamlessly on a traditional computer mouse, it may not function as expected on touchscreens. To address this, I implemented a workaround involving a separate element that tracks the parent's movement, allowing the child to follow suit and ensuring a smooth dragging experience on touchscreens.

## Z-Index 
An intriguing revelation in this process was the use of z-index to control the stacking order of positioned elements. While this property influences the stacking order among children and their parent within the same stacking context, it doesn't impact the stacking order of sibling elements.

## Touchscreen Optimization and Disabling Drag-Down-to-Refresh
Another challenge I encountered was to disable the "drag-down-to-refresh" functionality on touch screens in web browsers. This involved overcoming technical hurdles to create a more seamless user experience without the interference of unintentional page refreshing.

## User Interaction Enhancement
In addition, I worked on enhancing user interaction within my application. Specifically, I implemented a feature that preserves the position of an icon when dragged from the Recycle Bin back to the Desktop. This required understanding how to duplicate an icon and accurately replicate its position. As a result, upon returning an icon to the Desktop from the Recycle Bin, it will be precisely positioned at the last point of interaction. This attention to detail is aimed at creating a more user-friendly and responsive interface for an enjoyable user experience.

## Animation Issue Resolution
I also encountered an issue with the useSpring scrolling animation for the music window. I notice that if I view the portfolio with the music window open on my mobile device, when I drag the browser, the music window would blink. I knew it must be caused by the scrolling animation, so I did some research about how to pause the useSpring animation when touchmove.

## Job Inquiries
Feel free to explore the portfolio and contact me for any junior role available! Getting a job is harder than I thought before I enrolled in the software development course. I believe I have done everything I can, including drafting a good cover letter and a good resume and building a strong portfolio. Despite my efforts, I have only had one phone interview since completing the course!
