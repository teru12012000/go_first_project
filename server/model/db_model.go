package model

import (
	"database/sql"
	"log"

	"github.com/google/uuid"
	"github.com/jinzhu/gorm"

	// db_model.goでは使わないが，内部的に使われるためここでimportしておく
	_ "github.com/mattn/go-sqlite3"
)

type Todo struct {
	// 大文字にしなければ値が取得できない
	ID      string `json:"id"`
	CONTENT string `json:"content"`
	CHECKED int    `json:"checked"`
}

// DB初期化
func Init() {
	db, err := gorm.Open("sqlite3", "data/database.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	cmd := "CREATE TABLE IF NOT EXISTS todos (ID TEXT NOT NULL,CONTENT TEXT NOT NULL,CHECKED INTEGER NOT NULL)"
	_ = db.Exec(cmd)
}

// DBデータ取得
func GetTask() []Todo {
	db, err := sql.Open("sqlite3", "data/database.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	cmd := "SELECT * FROM todos"
	rows, err := db.Query(cmd)
	if err != nil {
		log.Fatal(err)
	}
	var datas []Todo
	for rows.Next() {
		var data Todo
		err := rows.Scan(&data.ID, &data.CONTENT, &data.CHECKED)
		if err != nil {
			log.Fatal(err)
		}

		datas = append(datas, data)
	}
	return datas
}

// DB追加
func PostData(CONTENT string, CHECKED int) {
	var uuid = uuid.New().String()
	db, err := sql.Open("sqlite3", "data/database.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	cmd := "INSERT INTO todos (ID,CONTENT,CHECKED)VALUES(?,?,?)"

	stmt, err := db.Prepare(cmd)
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()
	if _, err = stmt.Exec(uuid, CONTENT, CHECKED); err != nil {
		log.Fatal(err)
	}
}
