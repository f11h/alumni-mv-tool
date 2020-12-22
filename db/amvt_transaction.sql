create table transaction
(
    id          varchar(36)                              not null
        primary key,
    description varchar(255)                             not null,
    created     datetime(6) default current_timestamp(6) not null,
    amount      int                                      not null,
    memberId    varchar(36)                              null,
    constraint FK_766ddd676f52dbc7ad256828fd1
        foreign key (memberId) references member (id)
);

