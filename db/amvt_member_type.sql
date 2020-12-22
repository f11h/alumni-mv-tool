create table member_type
(
    id          varchar(36)  not null
        primary key,
    name        varchar(255) not null,
    monthlyFee  int          not null,
    annuallyFee int          not null
);

INSERT INTO amvt.member_type (id, name, monthlyFee, annuallyFee) VALUES ('a', 'Test', 300, 0);