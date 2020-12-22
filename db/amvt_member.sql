create table member
(
    id                 varchar(36)                           not null
        primary key,
    email              varchar(255)                          not null,
    password           varchar(255)                          not null,
    firstName          varchar(255)                          not null,
    lastName           varchar(255)                          not null,
    gender             enum ('0', '1', '2', '3') default '3' not null,
    joinedAt           datetime                              not null,
    memberTypeId       varchar(36)                           null,
    addressStreet      varchar(255)                          not null,
    addressHousenumber varchar(255)                          not null,
    addressZip         varchar(255)                          not null,
    addressCity        varchar(255)                          not null,
    constraint IDX_4678079964ab375b2b31849456
        unique (email),
    constraint FK_16ee4f562ec776ba5969d782af0
        foreign key (memberTypeId) references member_type (id)
);

INSERT INTO amvt.member (id, email, password, firstName, lastName, gender, joinedAt, memberTypeId, addressStreet, addressHousenumber, addressZip, addressCity) VALUES ('a', 'felix@fd-wob.de', '$2a$10$JKC9P6/B9A5aJcHEyktDCuH6LVsthP2oFFlGwcJlaWaoUxbHu7nuu', 'Felix', 'Dittrich', '1', '2020-12-21 20:30:21', 'a', 'Arnikaweg', '8', '38446', 'Wolfsburg');