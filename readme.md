# Project Breakpoint Templates

Ever make a basic static website in HTML only to get stuck keeping the HTML in your pages in sync?  You have your content that changes from page to page, but some elements stay the same.

Templates is a project that lets you mark your HTML.

Write your template in a file that ends with name._template.txt_.

In your code, surround the place you use the template with:

`<--<template: name="filename">-->`

And end it with:

`<--<end-template: name="filename">-->`

Where _filename_ is the name of your .template.txt.