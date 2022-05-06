# Encryption

## Encrypt

`POST /aes/encrypt`

### Request Body

| Name | Type | Description |
| ---- | ---- | ----------- |
| plain_text | String | Text to encrypt |
| aes_key | String | Encryption Key |

### Success response

Success response - `202`

| Name | Type | Description |
| ---- | ---- | ----------- |
| cipher_text | String | encrypted text |

### Error response

Error response - `400`

| Name | Type | Description |
| ---- | ---- | ----------- |
| errorMsg | String | Error message |


## Decrypt 

`POST /aes/decrypt`

### Request Body

| Name | Type | Description |
| ---- | ---- | ----------- |
| cipher_text | String | Text to decrypt |
| aes_key | String | Encryption Key |

### Success response

Success response - `202`

| Name | Type | Description |
| ---- | ---- | ----------- |
| plain_text | String | decrypted text |
| base64 | String | decrypted text in encoding Base 64 |

### Error response

Error response - `400`

| Name | Type | Description |
| ---- | ---- | ----------- |
| errorMsg | String | Error message |




