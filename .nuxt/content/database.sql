CREATE TABLE IF NOT EXISTS _content_info (id TEXT PRIMARY KEY, "ready" BOOLEAN, "version" VARCHAR);
INSERT INTO _content_info VALUES ('checksum_content', false, 'v3.2.0--bta8hdHhL7');
DROP TABLE IF EXISTS _content_content;
CREATE TABLE IF NOT EXISTS _content_content (id TEXT PRIMARY KEY, "title" VARCHAR, "body" TEXT, "description" VARCHAR, "extension" VARCHAR, "meta" TEXT, "navigation" TEXT DEFAULT true, "path" VARCHAR, "seo" TEXT DEFAULT '{}', "stem" VARCHAR);
UPDATE _content_info SET ready = true WHERE id = 'checksum_content';
INSERT INTO _content_content VALUES ('content/hello.md', 'Hello Content', '{"type":"minimal","value":[["h1",{"id":"hello-content"},"Hello Content"]],"toc":{"title":"","searchDepth":2,"depth":2,"links":[]}}', '', 'md', '{}', 'true', '/hello', '{"title":"Hello Content","description":""}', 'hello');