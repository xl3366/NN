
"""
#环境变量nn_accounts，账号密码用,分割，多账号之间用;分割
#例139****1234,passwd1;150****5678,passwd2
cron: 2 7 * * *
const $ = new Env("NN");
"""
import hashlib
import json
from time import sleep
import requests
import os


def login(phone, passwd):
    print(phone)
    _url = 'https://opapi.nnraytheon.com/u-mobile/pwdLogin'
    _data = {
        "countryCode": 86,
        "telNum": phone,
        "pwdEncry": hashlib.md5(bytes(passwd, encoding='utf-8')).hexdigest()
    }
    headers = {
        "Host": "opapi.nnraytheon.com",
        "token": "",
        "appid": "nnMobileIm_6z0g3ut7",
        "timestamp": "1675096362942",
        "signtype": "1",
        "sign": "",
        "version": "108",
        "reqchannel": "2",
        "deviceid": "d4uud558697ada1ec",
        "appname": "leigod_accelerator",
        "osversion": "12",
        "longitude": "0.0",
        "latitude": "0.0",
        "platform": "2",
        "registercanal": "common",
        "busitype": "nn_aksjfdasoifnkls",
        "content-type": "application/json; charset=UTF-8",
        "content-length": "87",
        "accept-encoding": "gzip",
        "user-agent": "okhttp/4.9.3"
    }
    login_status = requests.post(url=_url, data=json.dumps(_data), headers=headers).json()
    print(login_status['retMsg'])
    if login_status['retMsg'] != '该用户不存在':
        headers['token'] = login_status['retData']['token']
        _data = {
            "userId": login_status['retData']['userId']
        }
        task_ids = []
        task_list = requests.post(url='https://opapi.nnraytheon.com/nn-assist/taskPoints/findAllTask',
                                   data=json.dumps(_data), headers=headers).json()
        for task in task_list['retData']:
            task_ids.append(task['id'])
        print('任务ID:', task_ids)
        for task_id in task_ids:
            for e in range(10):
                _data = {
                    "point": 1,
                    "taskId": task_id,
                    "taskName": "",
                    "userId": login_status['retData']['userId']
                }
                result = requests.post(url='https://opapi.nnraytheon.com/nn-assist/taskPoints/pointCallBack',
                                        data=json.dumps(_data), headers=headers).json()
                print(result['retMsg'])
                if result['retMsg'] == '当天完成任务已上限':
                    break
                else:
                    sleep(0)
                    pass

# 获取环境变量中的所有账号和密码
accounts_str = os.environ.get('nn_accounts')

# 将账号和密码分割成列表
accounts_list = accounts_str.split(';')
for account in accounts_list:
    phone, passwd = account.split(',')
    login(phone, passwd)
