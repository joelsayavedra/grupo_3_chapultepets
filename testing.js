const bcryptjs = require('bcryptjs');

let hash = console.log(bcryptjs.hashSync("123456",10));

console.log(bcryptjs.compareSync("123456","$2a$10$WFsj9eBSeP7iFAah0YOaxuegvs4Qk9Vt.WJigtkr79YSJeB3IcZAG"));