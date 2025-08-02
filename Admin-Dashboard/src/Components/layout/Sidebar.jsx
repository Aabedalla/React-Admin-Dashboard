import { useState } from 'react'
import {ChevronDown, Zap} from 'lucide-react'
import userImg from './assets/user.png'
import menuItems from '../MenuItems.js'

const Sidebar = ({collapsed, onToggle, currentPage, onPageChanged})=>{
    const [expandedItems, setExpandedItems] = useState(new Set(["analytics"]))

    const toggleExpand = (itemid)=>{
        const newExpanded = new Set(expandedItems)

        if(newExpanded.has(itemid)){
            newExpanded.delete(itemid)
        }else{
            newExpanded.add(itemid)
        }

        setExpandedItems(newExpanded)
    }

    return(
        <div className={`${collapsed ? 'w-20' : 'w-72'} transition-all duration-300 ease-in-out bg-white/80 dark:bg-slate-900/80
        backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 flex flex-col
        relative z-10`}>
            {/* Logo */}
            <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Zap className='w-6 h-6 text-white'/>
                    </div>
                    {/* Conditinal Rendaring */}
                    {!collapsed && (
                        <div>
                            <h1 className='text-xl text-left font-bold text-slate-800 dark:text-white'>
                                Codency
                            </h1>
                            <p className='text-xs text-left text-slate-500 dark:text-slate-400'>
                                Admin Panel
                            </p>
                        </div>
                    )}
                </div>
            </div> 

            {/* Navigation with Dinamic Menus*/}
            <nav className='flex-1 overflow-y-auto max-h-[calc(100vh-120px)] p-4 space-y-2 md:pr-2'>
                {menuItems.map((n) => (
            <div key={n.id}>
                <button className={`flex w-full items-center justify-between p-3 rounded-xl transition-all duration-200 ${currentPage === n.id || n.active ? `bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25`: 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'}`} onClick={()=>{
                    if(n.submenu){
                        toggleExpand(n.id)
                    }else{
                        onPageChanged(n.id)
                    }
                }}>
                <div className="flex items-center space-x-3">
                    <n.icon className="w-5 h-5 text-slate-900 dark:text-white" />
                    
                    {!collapsed && (
                        <>
                        <span className='font-medium text-slate-900 dark:text-white ml-2'>{n.label}</span>
                        {n.badge && (
                            <span className='px-2 py-1 text-xs bg-red-500 text-white rounded-full'>{n.badge}</span>
                        )}
                        {n.count && (
                            <span className='px-2 py-1 text-xs bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full'>
                                {n.count}
                            </span>
                        )}
                        </>
                    )}
                        
                    
                </div>
                {!collapsed && n.submenu && (
                    <ChevronDown
                        className={`w-4 h-4 transition-transform text-slate-900 dark:text-white ${
                        expandedItems.has(n.id) ? 'rotate-180' : ''
                        }`}
                    />
                    )}
                    </button>
               {!collapsed && n.submenu && expandedItems.has(n.id) && (
                 <div className='ml-8 mt-2 space-y-1' >
                    {n.submenu.map((subname)=>{
                        return <button className='w-full text-left p-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-all'>{subname.label}</button>
                    })}
                </div>
               ) }
            </div>
            ))}

            </nav>
           
            {!collapsed && (
                <div className='p-4 border-t border-slate-200/50 dark:border-slate-700/50'>
                <div className='flex items-center space-x-3 p-3 rounded-xl bg-slate-50
                dark:bg-slate-800/50'>
                    <img src={userImg} className='w-10 h-10 rounded-full ring-2 ring-blue-500' />
                <div className='flex-1 min-w-0'>
                    <div className='flex-1 min-w-0'>
                        <p className='text-sm font-medium text-slate-800 dark:text-white truncate'>
                            Abedalla Emara
                        </p>
                        <p className='text-sm text-slate-500 dark:text-slate-400 truncate'>
                            Administrator
                        </p>
                    </div>
                </div>
                </div>
            </div>
            )}
            
        </div>
    )
}

export default Sidebar