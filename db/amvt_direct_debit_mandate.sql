create table direct_debit_mandate
(
    id                             varchar(36)  not null
        primary key,
    mandateReference               varchar(255) null,
    signedAt                       datetime     null,
    accountOwnerName               varchar(255) null,
    bankName                       varchar(255) null,
    IBAN                           varchar(255) not null,
    accountOwnerAddressStreet      varchar(255) not null,
    accountOwnerAddressHousenumber varchar(255) not null,
    accountOwnerAddressZip         varchar(255) not null,
    accountOwnerAddressCity        varchar(255) not null,
    BIC                            varchar(255) not null,
    memberId                       varchar(36)  null,
    constraint IDX_20040a0c329c05bde63de01a7c
        unique (memberId),
    constraint IDX_dda7e099f32476702278306fd1
        unique (mandateReference),
    constraint REL_20040a0c329c05bde63de01a7c
        unique (memberId),
    constraint FK_20040a0c329c05bde63de01a7c7
        foreign key (memberId) references member (id)
);

INSERT INTO amvt.direct_debit_mandate (id, mandateReference, signedAt, accountOwnerName, IBAN, accountOwnerAddressStreet, accountOwnerAddressHousenumber, accountOwnerAddressZip, accountOwnerAddressCity, BIC, memberId) VALUES ('ae1e3f7f-cd53-45a3-a5e0-003a9ba256cf', 'MGB-22122020-FELDIT73D807D66BAFDD', '2020-12-22 21:44:53', 'Felix Dittrich', 'DE43160500004526043546', 'Arnikaweg', '8', '38446', 'Wolfsburg', null, 'a');