# NodeJs REST API with Express & MySQL

## Description

Rest Apis for creating, retrieving, updating, deleting and get ebook item, integrate with database MySQL.

**Base URL** : **`http://base_url`**

## Usage
| Methods | Urls                    | Actions                                     |
|---------|-------------------------|---------------------------------------------|
| GET     | api/ebook           | get all ebooks                           |
| GET     | api/ebook/:id       | get ebook item by id                         |
| POST    | api/ebook           | add new ebook item                           |
| PUT     | api/ebook/:id       | update ebook item by id                      |
| DELETE  | api/ebook/:id       | remove ebook item by id                      |
| DELETE  | api/ebook           | remove all ebook item                        |
| GET     | api/ebook?title=[cn] | find all ebook item which title contains 'cn' |

## add new ebook item 


**URL** : `/api/ebook`

**Method** : `POST`

**Body** :
```json
{
    "title": "Judul Buku 3",
    "cover": "http://cover.com/cover3.jpg",
    "synopsis": "pada jaman dahulu..",
    "url": "http://pdf.com/judul3.pdf",
    "author": "polan3",
    "year": "2022"
}

```


### Success Response

**Code** : `200 OK`

**Content examples :**


```json
{
    "title": "Judul Buku 3",
    "cover": "http://cover.com/cover3.jpg",
    "synopsis": "pada jaman dahulu..",
    "url": "http://pdf.com/judul3.pdf",
    "author": "polan3",
    "year": "2022"
}
```

## get all ebooks


**URL** : `/api/ebook`

**Method** : `GET`


### Success Response

**Code** : `200 OK`

**Content examples :**

```json
[
    {
        "id": 1,
        "title": "Judul Buku 1",
        "cover": "http://cover.com/cover.jpg",
        "synopsis": "pada jaman dahulu..",
        "url": "http://pdf.com/judul.pdf",
        "author": "polan",
        "year": "2022"
    },
    {
        "id": 2,
        "title": "Judul Buku 2",
        "cover": "http://cover.com/cover2.jpg",
        "synopsis": "deskripsi...",
        "url": "http://pdf.com/judul2.pdf",
        "author": "fulan",
        "year": "2022"
    }
]
```

## get ebook item by id 


**URL** : `/api/ebook/:id`

**Method** : `GET`


### Success Response

**Code** : `200 OK`

**Content examples**

`http://base_url/api/ebook/1`


```json
{
    "id": 1,
    "title": "Judul Buku 1",
    "cover": "http://cover.com/cover.jpg",
    "synopsis": "pada jaman dahulu..",
    "url": "http://pdf.com/judul.pdf",
    "author": "polan",
    "year": "2022"
}
```

## update ebook item by id   


**URL** : `/api/ebook/:id`

**Method** : `PUT`

**Body** :
```json
{
    "title": "Judul Baru",
    "cover": "http://cover.com/cover_baru.jpg",
    "synopsis": "sinopsis baru",
    "url": "http://pdf.com/url_baru.pdf",
    "author": "author baru",
    "year": "2022"
}

```


### Success Response

**Code** : `200 OK`

**Content examples :**


```json
{
    "title": "Judul Baru",
    "cover": "http://cover.com/cover_baru.jpg",
    "synopsis": "sinopsis baru",
    "url": "http://pdf.com/url_baru.pdf",
    "author": "author baru",
    "year": "2022"
}
```

## get ebook by title 


**URL** : `/api/ebook?title=ebookTitle`

**Method** : `GET`


### Success Response

**Code** : `200 OK`

**Content examples :**

`base_url/api/ebook?title=baru`

**Result :**


```json
{
    "id": 2,
    "title": "Judul Baru",
    "cover": "http://cover.com/cover_baru.jpg",
    "synopsis": "sinopsis baru",
    "url": "http://pdf.com/url_baru.pdf",
    "author": "author baru",
    "year": "2022"
}
```


## remove ebook item by id 


**URL** : `/api/ebook/:id`

**Method** : `DELETE`


### Success Response

**Code** : `200 OK`

**Content examples :**

`base_url/api/ebook/2`


```json
{
    "message": "Ebook with id 2 was deleted successfully!"
}
```

## remove all ebooks


**URL** : `/api/ebook`

**Method** : `DELETE`


### Success Response

**Code** : `200 OK`

**Content examples :**


```json
{
    "message": "All ebook data were deleted successfully!"
}
```


