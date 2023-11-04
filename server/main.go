package main

import (
	db_model "server/model"

	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
)

// 取得の関数
func getTodo(c *gin.Context) {
	//取得の関数を実行
	todos := db_model.GetTask()
	//レスポンスを返す
	c.JSON(200, todos)
}

// requestのbodyの型定義
type Input struct {
	CONTENT string
	CHECKED int
}

// 挿入の関数
func postTodo(c *gin.Context) {
	//リクエストにおけるbodyの部分はここに格納する
	var reqBody Input
	c.BindJSON(&reqBody)
	//DB挿入の関数をここで実行する
	db_model.PostData(reqBody.CONTENT, reqBody.CHECKED)

	//ここでレスポンスを返す
	c.JSON(200, "OK")
}

// requestのbodyの型定義
type Update struct {
	ID      string
	CONTENT string
	CHECKED int
}

func updateTodo(c *gin.Context) {
	//リクエストにおけるbodyの部分はここに格納する
	var reqBody Update
	c.BindJSON(&reqBody)
	//DB挿入の関数をここで実行する
	db_model.UpdateData(reqBody.ID, reqBody.CONTENT, reqBody.CHECKED)
	//ここでレスポンスを返す
	c.JSON(200, "OK")
}

func deleteTodo(c *gin.Context) {
	//パラメータとしてidを取得する
	id := c.Param("id")
	//DB削除の関数をここで実行
	db_model.DeleteData(id)
	c.JSON(200, "OK")
}
func main() {
	r := gin.Default()
	//cors Error対策
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"https://localhost:3000",
			"https://localhost:3001",
		},
		AllowMethods: []string{
			"POST",
			"GET",
			"DELETE",
			"PUT",
		},
		AllowHeaders: []string{
			"Access-Control-Allow-Credentials",
			"Access-Control-Allow-Headers",
			"Content-Type",
			"Content-Length",
			"Accept-Encoding",
			"Authorization",
		},
	}))
	//DBのテーブル作成
	db_model.Init()
	//DBからtodoを取得するAPI
	r.GET("/get_datas", getTodo)
	//DBにtodoを挿入するAPI
	r.POST("/post_data", postTodo)
	//todo内容を変更し更新する
	r.PUT("update_data", updateTodo)
	//todoの内容を削除する
	r.DELETE("/delete_data/:id", deleteTodo)
	//PORT番号を指定しサーバー起動(PORT番号を指定しなければ8080なはず)
	r.Run(":9090")
}
