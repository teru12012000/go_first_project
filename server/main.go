package main

import (
	db_model "server/model"

	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
)

func getTodo(c *gin.Context) {
	todos := db_model.GetTask()
	c.JSON(200, todos)
}

type Input struct {
	CONTENT string
	CHECKED int
}

func postTodo(c *gin.Context) {
	var reqBody Input
	c.BindJSON(&reqBody)
	db_model.PostData(reqBody.CONTENT, reqBody.CHECKED)
	c.JSON(200, "OK")
}
func main() {
	r := gin.Default()
	//cors Error対策
	r.Use(cors.New(cors.Config{
		// アクセスを許可したいアクセス元
		AllowOrigins: []string{
			"https://localhost:3000",
			"https://localhost:3001",
		},
		// アクセスを許可したいHTTPメソッド(以下の例だとPUTやDELETEはアクセスできません)
		AllowMethods: []string{
			"POST",
			"GET",
			"DELETE",
			"PUT",
		},
		// 許可したいHTTPリクエストヘッダ
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
	r.POST("/post_data", postTodo)
	r.Run(":9090")
}
