package main

import (
	db_model "server/model"

	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
)

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

func postTodo(c *gin.Context) {
	//リクエストにおけるbodyの部分はここに格納する
	var reqBody Input
	c.BindJSON(&reqBody)
	//DB挿入の関数をここで実行する
	db_model.PostData(reqBody.CONTENT, reqBody.CHECKED)

	//ここでレスポンスを返す
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
	//PORT番号を指定しサーバー起動(PORT番号を指定しなければ8080なはず)
	r.Run(":9090")
}
