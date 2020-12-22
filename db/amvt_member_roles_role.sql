create table member_roles_role
(
    memberId varchar(36) not null,
    roleId   varchar(36) not null,
    primary key (memberId, roleId),
    constraint FK_461c09a3f22bcd2826d6a35beee
        foreign key (roleId) references role (id)
            on delete cascade,
    constraint FK_f06fd43acb50f70b16533f00740
        foreign key (memberId) references member (id)
            on delete cascade
);

create index IDX_461c09a3f22bcd2826d6a35bee
    on member_roles_role (roleId);

create index IDX_f06fd43acb50f70b16533f0074
    on member_roles_role (memberId);

INSERT INTO amvt.member_roles_role (memberId, roleId) VALUES ('a', 'root');