import React from 'react'
import Input from '../atoms/Input'
import { useLanguage } from '../../context/LanguageContext'

export default function SearchBar({ value, onChange }) {
  const { t } = useLanguage()
  return (
    <div className="search-bar">
      <label htmlFor="search" className="hidden">{t('searchLabel')}</label>
      <Input id="search" type="search" value={value} onChange={onChange} placeholder={t('searchPlaceholder')} />
    </div>
  )
}
