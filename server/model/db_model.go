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

// DB初期化(すでに作られているならほとんど無意味なコードになっている)
func Init() {
	db, err := gorm.Open("sqlite3", "data/database.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	//テーブル作成のSQL構文を作成する
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
	//SQL構文を書く
	cmd := "SELECT * FROM todos"
	rows, err := db.Query(cmd)
	if err != nil {
		log.Fatal(err)
	}
	var datas []Todo
	//DB取得データを変数に格納
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
	//uuid 固有のIDを生成する
	var uuid = uuid.New().String()
	db, err := sql.Open("sqlite3", "data/database.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()
	//挿入のSQL文を書く?にはそれぞれ入れたいパラーメータがのちに入る
	cmd := "INSERT INTO todos (ID,CONTENT,CHECKED)VALUES(?,?,?)"

	stmt, err := db.Prepare(cmd)
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()
	//パラメータをぶち込む！
	if _, err = stmt.Exec(uuid, CONTENT, CHECKED); err != nil {
		log.Fatal(err)
	}
}

// DB更新
func UpdateData(ID string, CONTENT string, CHECKED int) {
	db, err := sql.Open("sqlite3", "data/database.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()
	//更新のSQL文を書く?にはそれぞれ入れたいパラーメータがのちに入る
	cmd := "UPDATE todos SET CONTENT=$1, CHECKED=$2 WHERE id=$3"

	stmt, err := db.Prepare(cmd)
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()
	//パラメータをぶち込む！
	if _, err = stmt.Exec(CONTENT, CHECKED, ID); err != nil {
		log.Fatal(err)
	}
}

func DeleteData(ID string) {
	db, err := sql.Open("sqlite3", "data/database.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()
	//削除のSQL文を書く?にはそれぞれ入れたいパラーメータがのちに入る
	cmd := "DELETE FROM todos WHERE id=?"

	stmt, err := db.Prepare(cmd)
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()
	//パラメータをぶち込む！
	if _, err = stmt.Exec(ID); err != nil {
		log.Fatal(err)
	}
}
