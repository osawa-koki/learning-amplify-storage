import React, { useEffect, useState } from 'react'
import { type ListPaginateInput, list, getUrl, remove } from 'aws-amplify/storage'
import { Table } from 'react-bootstrap'

import { IoReloadSharp } from 'react-icons/io5'
import { FaDownload } from 'react-icons/fa6'
import { FaTrash } from 'react-icons/fa'

import { toast } from 'react-toastify'

import dayjs from 'dayjs'

export default function ListfilesComponent (): React.JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [files, setFiles] = useState<StorageItem[]>([])

  const load = async (): Promise<void> => {
    const listPaginateInput: ListPaginateInput = {
      prefix: '',
      options: {
        accessLevel: 'private'
      }
    }
    try {
      const listResult = await list(listPaginateInput)
      const items = listResult.items
      setFiles(items)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    load()
      .then(() => {
      })
      .catch((error) => {
        console.error(error)
        toast.error('Failed to load files.')
      })
  }, [])

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <IoReloadSharp onClick={async () => {
        setIsLoading(true)
        await load()
        setIsLoading(false)
      }} className={`${isLoading ? 'bg-secondary' : ''} border my-1`} role='button' />
      <Table>
        <thead>
          <tr>
            <th>name</th>
            <th>size</th>
            <th>lastModified</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => {
            return (
              <tr key={file.key}>
                <td>{file.key}</td>
                <td>{file.size}</td>
                <td>{file.lastModified != null ? dayjs(file.lastModified).format('YYYY-MM-DD HH:mm:ss') : 'undefined'}</td>
                <td>
                  {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                  <FaDownload onClick={async () => {
                    const getUrlResult = await getUrl({
                      key: file.key,
                      options: {
                        accessLevel: 'private'
                      }
                    })
                    const url = getUrlResult.url.href
                    const a = document.createElement('a')
                    a.href = url
                    a.download = file.key
                    a.click()
                    a.remove()
                  }} role='button' />
                </td>
                <td>
                  {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                  <FaTrash onClick={async () => {
                    if (!window.confirm('Are you sure you want to delete this file?')) return
                    try {
                      await remove({
                        key: file.key,
                        options: {
                          accessLevel: 'private'
                        }
                      })
                      toast.success('File deleted.')
                    } catch (error) {
                      console.error(error)
                      toast.error('Failed to delete file.')
                    } finally {
                      await load()
                    }
                  }} role='button' className='text-danger' />
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}
