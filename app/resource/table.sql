CREATE TABLE `role_permissions` (
  `role_permission_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `action` varchar(45) DEFAULT NULL,
  `resource` varchar(45) DEFAULT NULL,
  `attribute` varchar(450) DEFAULT NULL,
  `permissions` varchar(450) NOT NULL,
  `role` varchar(45) NOT NULL,
  `catalog` varchar(45) NOT NULL,
  PRIMARY KEY (`role_permission_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
