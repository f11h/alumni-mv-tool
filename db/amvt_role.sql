create table role
(
    id          varchar(36)  not null
        primary key,
    name        varchar(255) not null,
    permissions text         not null
);

INSERT INTO amvt.role (id, name, permissions) VALUES ('root', 'root', '["roles.*", "own_transaction.*", "all_transaction.*", "own_membership.*", "documents.*", "personal_documents.*", "outstanding_payments.*", "membership_fee.*", "members.*", "roles_assignment.*", "messages.*", "newsletter.*"]');