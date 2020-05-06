BEGIN;

  TRUNCATE
  users
  RESTART IDENTITY CASCADE;

INSERT INTO users
  ("username", "password", "id")
VALUES
  (
    'admin',
    -- 'Password1!' using salt of 12
    '$2a$12$wc5vUYU3XuCnSqaLGVzKu.zzrR.2OTKL977bJBayXpT1bnh9qahcm',
    'f80c78fb-ad06-4e86-9761-d44cafe81ee4'
 );

COMMIT;
