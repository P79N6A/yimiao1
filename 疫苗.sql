select * from users
select * from dept
select * from emp
select * from people
select * from emp and dept where fkdeptid == deptid

CREATE TABLE `yimiao` (
  `yid` varchar(50) default NULL,
  `yname` varchar(50) default NULL,
  `ysc` varchar(50) default NULL,
  `ybzq` varchar(50) default NULL,
  `ypici` varchar(50) default NULL,
  `ylx` varchar(50) default NULL,
  `ysccj` varchar(50) default NULL,
  `fkdeptid` varchar(50) default NULL
) charset='utf8'

select * from yimiao

insert  into `yimiao`(`yid`,`yname`,`ysc`,`ybzq`,`ypici`,`ylx`,`ysccj`,`fkdeptid`) values (rand(),'类毒素','2017-01-09','12个月','6527151675dda','类毒素疫苗','北京市','a');
insert  into `yimiao`(`yid`,`yname`,`ysc`,`ybzq`,`ypici`,`ylx`,`ysccj`,`fkdeptid`) values (rand(),'亚单位疫苗','2017-06-05','24个月','234216755a','类毒素疫苗','哈尔滨市','b');

