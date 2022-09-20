export const SQL_SELECT_REC_ROWS = 'SELECT rec_id, date, cat_id, created, title FROM rec ORDER BY rec_id DESC LIMIT ?';

export const SQL_SELECT_REC_ROW = 'SELECT * FROM rec WHERE rec_id = ?';

export const SQL_INSERT_REC_ROW =
  'INSERT INTO rec (cat_id, title, text, tags, date, created) VALUES (?, ?, ?, ?, ?, datetime())';

export const SQL_UPDATE_REC_ROW = 'UPDATE rec SET cat_id = ?, title = ?, text = ?, tags = ?, date = ? WHERE rec_id = ?';

export const SQL_DELETE_REC_ROW = 'DELETE FROM rec WHERE rec_id = ?';
