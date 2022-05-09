import { Request, Response } from 'express'
import { UrlModel } from '../model/url'
import shortid from 'shortid'
import { config } from '../config/constants'

export class UrlController {
  public async shorten(req: Request, res: Response): Promise<void> {
    const { originUrl } = req.body
    const url = await UrlModel.findOne({ originUrl })
    if (url) {
      res.json(url)
    }
    const hash = shortid.generate()
    const shortUrl = `${config.API_URL}/${hash}`

    const newUrl = await UrlModel.create({ hash, originUrl, shortUrl })
    res.json(newUrl)
  }

  public async redirect(req: Request, res: Response): Promise<void> {
    const { hash } = req.params
    const url = await UrlModel.findOne({ hash })
    if (url) {
      res.redirect(url.originUrl)
    }

    res.status(400).json({ error: 'URL not found' })
  }
}
