create table Users (
    id int PRIMARY KEY NOT null AUTO_INCREMENT,
    email  varchar(60) not null,
    first_name varchar(60),
    last_name varchar(60),
    password varchar(60) not null,
    phone varchar(20) not null,
    address varchar(60),
    is_admin boolean
    );
create table Property (
    id int PRIMARY KEY NOT null AUTO_INCREMENT,
    owner  int,
    status varchar(60),
    price varchar(60),
    state varchar(60) not null,
    city varchar(20) not null,
    address varchar(60),
    type varchar(60),
    image_url varchar(60),
    created_on date,
    FOREIGN KEY (owner) references Users(id)
    );
create table Reports (
    id int not null PRIMARY KEY AUTO_INCREMENT,
    property_id int,
    created_on date not null DEFAULT CURRENT_DATE,
    reason varchar(60),
    description varchar(512),
    FOREIGN KEY (property_id) REFERENCES Property(id)
    );
    