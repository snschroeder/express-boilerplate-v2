BEGIN;

TRUNCATE
  users
  RESTART IDENTITY CASCADE;

INSERT INTO users ("username", "password", "id")
VALUES (
  'admin',
  -- 'Password1!' using salt of 12
'$2a$12$wc5vUYU3XuCnSqaLGVzKu.zzrR.2OTKL977bJBayXpT1bnh9qahcm',
'7ad87401-dda8-48f0-8ed8-a6bc9756e53c'
);

COMMIT;
