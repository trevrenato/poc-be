CREATE TRIGGER set_updated
    BEFORE UPDATE ON address_book
    FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_updated();
