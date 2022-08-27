Causes of rerendering in React : https://www.joshwcomeau.com/react/why-react-re-renders/

React's “main job” is to keep the application UI in sync with the React state. The point of a re-render is to figure out what needs to change.
when a component re-renders, it also re-renders all of its descendants.

Data cannot flow up in React.

When a component re-renders, it tries to re-render all descendants, regardless of whether they're being passed a particular state variable through props or not.
Here's the answer: it's hard for React to know, with 100% certainty, whether <Decoration> depends, directly or indirectly, on the count state variable.

Pure Components:
function Decoration() {
return (

<div className="decoration">
⛵️
</div>
);
}
export default React.memo(Decoration);

By wrapping our Decoration component with React.memo, we're telling React “Hey, I know that this component is pure. You don't need to re-render it unless its props change.”

This uses a technique known as memoization.

It's missing the R, but we can sorta think of it as “memorization”. The idea is that React will remember the previous snapshot. If none of the props have changed, React will re-use that stale snapshot rather than going through the trouble of generating a brand new one.

console.info()

Profiler: record why each component rendered

The general flow looks like this:

Start recording by hitting the little blue “record” circle.
Perform some actions in your application.
Stop recording.
View the recorded snapshots to learn more about what happened.

Highlight Updates when component render
With this setting enabled, you should see green rectangles flash around components that re-render:

When we render a component, we're calling the function.

React basically renders Derived data to the UI/Browser
