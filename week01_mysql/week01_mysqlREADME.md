# Week 01 - MySQL 学生表与操作封装

##  本周目标：
- 学会使用 SQL 创建数据库与学生表
- 编写 Python 类 `MySqlHelper` 封装对数据库的连接、增删查操作

##  使用方法

### 1. 运行 SQL 脚本创建表

使用 MySQL 工具执行 `create_student_table.sql` 创建数据库和表：

```bash
mysql -u root -p < create_student_table.sql
