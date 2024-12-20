# XSS

`XSS`（Cross Site Scripting）攻击全称跨站脚本攻击，是为不和层叠样式表 (Cascading Style Sheets), `CSS` 的缩写混淆，故将跨站脚本攻击缩写为XSS。

## XSS分类

xss 分为三种:反射型、DOM型、存储型
危害程度:存储型> DOM型 > 反射型

### 反射型

反射型又称非持久型XSS，通过给别人发送带有恶意脚本代码参数的URL，欺骗用户点击链接，当用户单击触发，特有的恶意代码参数被HTML解析、执行，这类跨站的代码通常不存储于服务端。
一般网站的搜索栏、用户登陆入口、输入表单等地方，简单地将用户输入的数据直接或未经过完善的安全过滤就在浏览器中进行输岀，导致输岀的数据中存在可被浏览器执行的代码数据。

```md
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>XSS</title>
</head>
<body>
    <form action="" method="get">
        <input type="text" name="input">
        <input type="submit">
    </form>
    <br>
    <?php
        error_reporting(error_level: 0);
        $xssReFlex = $_GET['input'];
        echo 'output:<br>' . $xssReFlex;
    ?>
</body>
</html>
```

攻击者如果发现某个网站存在反射型的漏洞 就可以通过含有恶意代码的 url（生成的短链，用户往往无法识别） 欺骗用户点击后，执行恶意代码

特点：

+ 非持久化
+ 经过后端，但不存入数据库

### DOM型

基于DoM文档对象的一种漏洞，并且DOM型XSS是基于JS代码的，并不需要与服务器进行交互。其通过修改页面DOM节点数据信息而形成的ⅩSS跨站脚本攻击。不同 于反射型XSS和存储型XSS，基于DOM的XSS跨站脚本攻击往往需要针对具体的 Javascript DOM代码进行分析，并根据实际情况进行XSS跨站脚本攻击的利用。

网站的前端代码中包含不安全的动态 DOM 操作

### 存储型

顾名思义,其攻击的 xss 代码会一直存储在数据库中。攻击者在提交的时候，注入xss恶意代码到数据库中。当普通用户查询对应页面时，那些内容会从服务解析之后加载出来。浏览器发现有 XSS 代码，就当做正常的 HTML 和 JS 解析执行。

恶意脚本被存储在网站的数据库或文件中，当其他用户访问相关页面时，恶意脚本会被加载并执行。往往是网站对于存储到数据库中的内容未做过滤。导致危害 （攻击者在评论区、论坛或反馈表单中插入恶意代码 正常用户浏览这些页面时，恶意代码被执行）

### 防御手段

我自己尝试的php实验是会出现上述的`XSS`攻击的情况,因为默认是不转义的。而在前端React框架中是默认转义的 只有`dangerouslySetInnerHTML` 它允许直接插入未经转义的 HTML 内容。如果插入的内容不安全，就会导致 XSS 漏洞。

+ 对用户的输入内容进行校验，避免一些恶意脚本
+ 对输出转义，防止 HTML/JS 被解析
+ 避免直接使用 `innerHTML` 或 `dangerouslySetInnerHTML`
+ 配置内容安全策略，限制页面中可执行的脚本白名单
