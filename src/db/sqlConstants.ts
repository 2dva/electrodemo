export const SQL_SELECT_REC_ROWS = 'SELECT rec_id, date, cat_id, created, title FROM rec ORDER BY rec_id DESC';

export const SQL_SELECT_REC_ROW = 'SELECT * FROM rec WHERE rec_id = ?';

export const SQL_INSERT_REC_ROW =
  'INSERT INTO rec (date, cat_id, title, text, created, tags) VALUES (date(), ?, ?, ?, datetime(), ?)';

export const SQL_UPDATE_REC_ROW = 'UPDATE rec SET title = ?, text = ?, tags = ? WHERE rec_id = ?';
