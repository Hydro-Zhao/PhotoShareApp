[CS142: Web Applications (Spring 2020)](http://web.stanford.edu/class/cs142/)

> http://web.stanford.edu/class/cs142/projects.html
>
> https://github.com/DARRENSKY/Web-Applications

### Project 1: HTML and CSS1

> https://css-tricks.com/snippets/css/a-guide-to-flexbox/
> 
> https://www.w3schools.com/howto/howto_css_div_full_height.asp
>
> https://techwelkin.com/how-to-vertically-middle-align-text-in-a-div#:~:text=By%20default%2C%20the%20text%20piece%20inside%20a%20DIV,with%20respect%20to%20the%20containing%20element%20as%20well.
>
> https://www.w3schools.com/js/js_function_call.asp

TODO However, the boxes themselves should never overlap or change size?

```
display: inline-block;
height: 100%;
white-space: nowrap;
CSS Flexbox layout
```

### Project 2: JavaScript Calisthenics

```
anonymous function
```

### Project 3: JavaScript and the DOM

TODO 测试中在一个datepicker div中是有两个日历，而我加的两个listener不是独立，点一个，另外一个也会变。（修复这个bug之后，render中清除datepicker child的操作也要变成针对特定的日历）

TODO 似乎datepicker2的某些月份显示天数不够

> https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction
>
> https://www.w3schools.com/jsref/coll_table_rows.asp
>
> https://www.w3schools.com/jsref/coll_table_cells.asp

TODO how to export and  import a old style class in another folder 

```
ECMAScript 2015 class syntax 
older style class definition using functions

Methods of the Date class
parseInt, parseFloat, isNaN

firstChild
nextSibling
tagName

rows
cells
innerHTML
textContent

console.log
debuger;
```

### Project 4: Page Generation with ReactJS

TODO Problem3

因为不理解React背后的行为，我在project4中button的逻辑部分卡了很久。我的想法就是设置一个叫example的布尔值，来决定显示哪个。但是这会导致`Maximum Update Depth Exceeded`，我主要参考了这两个地方来解决问题[React Js, Maximum Update Depth Exceeded](https://stackanswers.net/questions/react-js-maximum-update-depth-exceeded)，[React - uncaught TypeError: Cannot read property 'setState' of undefined](https://stackoverflow.com/questions/32317154/react-uncaught-typeerror-cannot-read-property-setstate-of-undefined)。按照前面一个的方法去掉括号，在按照后一个的方法bind最后就解决了问题。但是我任然不知道问题出在哪，是因为setState的异步吗？为什么event handler不加括号就要bind？**同样的代码，为什么加了括号直接调用就是错的**？为什么problem1和2不用去掉括号，不用bind，但是同样用到setState就能够成功？**（其实这些正是problem1中example.jsx介绍的handleChangeBound和handleButtonClick()的区别，虽然实验指导和代码注释里面解释了很多，但是我看不懂。**）

###
###
###
###
###