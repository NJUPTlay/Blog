# TCP/IP网络模型

为什么会有TCP/IP网络模型？这是针对于不同设备之间的进程通讯。为了方便，将不同设备之间的通讯协议进行统一兼容，于是就有了TCP/IP网络模
型。
## 应用层
应用层是针对具体的应用程序进行协议的制定，比如HTTP、FTP等。这就是我们所直观接触到的，它只需要负责将应用数据传给传输层就好。
## 传输层
如果应用层是操作系统中的用户态，那么传输层则是用户相关的内核。
传输层主要负责数据的可靠传输，比如TCP和UDP。
大多数的情况下，传输层会选择TCP协议，因为TCP是流式传输的，它具备了控制拥塞、超时丢包重传、流量控制等特性。而UDP则是不可靠的，它只负责将数据包发送出去(当然、可以去类比TCP，加入TCP特性)。
同时，当T传输的数据大于MSS时，就会采用TCP分段，这样就可以避免TCP粘包问题。
![alt text](/TCPfragmentation.png)
由于应用层会有多个应用需要进行数据传输，所以传输层会为每个应用分配特定一个端口号；并且传输层的报文中会携带端口号，以此来做到区别。
## 网络层
网络层主要负责IP地址的选择和路由选择，比如IP协议。
以IPv4为例，IP地址由网络号（负责标识该 IP 地址是属于哪个「子网」的）和主机号组成（「子网」下的不同主机）。（子网掩码）
为了得到对应的IP地址，需要先选择网络号，然后通过路由选择找到对应的路由器（IP寻址）。

## 网络接口层
在以太网的进行通讯就需要用到MAC地址，它是由网卡生产商分配的。

## 总结
TCP/IP分为应用层、传输层、网络层、网络接口层，其协议栈的封装模式如下：
![alt text](/mode.png)