import React, { useState, useEffect, useMemo, useRef } from 'react';
import Login from './components/Login';
import ChatAgent from './components/ChatAgent';
import TripMap from './components/TripMap';
import { Icons } from './components/Icons';
import { MOCK_ITEMS, CATEGORY_LABELS, MOCK_PACKAGES } from './constants';
import { ItineraryItem, TripContext, UserProfile, ItineraryStatus, Category, TravelItem, TravelPackage, CurrencyCode, MembershipLevel } from './types';

// Multi-currency Configuration
const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  TWD: 1.0,
  USD: 0.031,
  JPY: 4.65,
  KRW: 42.0,
  EUR: 0.029
};

const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  TWD: 'TWD',
  USD: '$',
  JPY: '¥',
  KRW: '₩',
  EUR: '€'
};

const DIAMOND_THRESHOLD = 20000;

// Simple Notification Component
const Toast = ({ message }: { message: string }) => (
  <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg z-50 animate-fade-in-down">
    {message}
  </div>
);

// Custom Dropdown Component for Day Selection
const DaySelectorDropdown = ({ 
  item, 
  onSelect, 
  isLocked 
}: { 
  item: TravelItem; 
  onSelect: (day: number) => void;
  isLocked: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const availableDays = [1, 2, 3].filter(d => !(item.category === 'STAY' && d === 3));

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        disabled={isLocked}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold border transition-all ${
          isLocked 
            ? 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed' 
            : 'bg-white border-gray-200 text-gray-700 hover:border-red-600 hover:text-red-600 shadow-sm active:scale-95'
        }`}
      >
        <span>Add to Trip</span>
        {isOpen ? <Icons.ChevronUp className="w-4 h-4" /> : <Icons.ChevronDown className="w-4 h-4" />}
      </button>

      {isOpen && (
        <div className="absolute right-0 bottom-full mb-2 w-32 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fade-in-down">
          <div className="p-2 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 border-b border-gray-100">
            Select Day
          </div>
          {availableDays.map(d => (
            <button
              key={d}
              onClick={() => {
                onSelect(d);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-sm font-bold text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center justify-between group"
            >
              Day {d}
              <Icons.Plus className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Custom Currency Selector
const CurrencySelector = ({ current, onSelect }: { current: CurrencyCode; onSelect: (c: CurrencyCode) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-bold hover:bg-gray-200 transition-colors border border-transparent hover:border-gray-300"
      >
        <span>{current}</span>
        <Icons.ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-24 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-fade-in-down">
          {(Object.keys(EXCHANGE_RATES) as CurrencyCode[]).map(code => (
            <button
              key={code}
              onClick={() => {
                onSelect(code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-xs font-black transition-colors ${
                current === code ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {code}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00", "13:00", 
  "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
];

const TRIP_DAYS = [1, 2, 3];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [tripContext, setTripContext] = useState<TripContext | null>(null);
  
  // App State
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);
  const [activeTab, setActiveTab] = useState<'DISCOVERY' | 'PACKAGES' | 'ITINERARY'>('DISCOVERY');
  const [activeCategory, setActiveCategory] = useState<Category>('STAY');
  const [currency, setCurrency] = useState<CurrencyCode>('TWD');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  
  // Modal states
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
  const [showSuccessSplash, setShowSuccessSplash] = useState(false);
  
  // Package expansion state
  const [expandedPackageIds, setExpandedPackageIds] = useState<Set<string>>(new Set());

  // Helper: Format Price based on current currency
  const formatPrice = (twdAmount: number) => {
    const rate = EXCHANGE_RATES[currency];
    const symbol = CURRENCY_SYMBOLS[currency];
    const converted = twdAmount * rate;
    
    const hasDecimals = currency === 'USD' || currency === 'EUR';
    const formatted = converted.toLocaleString(undefined, {
      minimumFractionDigits: hasDecimals ? 2 : 0,
      maximumFractionDigits: hasDecimals ? 2 : 0,
    });

    return `${symbol}${currency === 'TWD' || currency === 'KRW' ? ' ' : ''}${formatted}`;
  };

  // Derived State
  const totalCostTWD = useMemo(() => {
    if (!userProfile) return 0;
    return itinerary.reduce((sum, item) => {
      let cost = item.price * userProfile.headcount;
      if (item.category === 'STAY') {
        cost = item.price * Math.ceil(userProfile.headcount / 2); 
      }
      return sum + cost;
    }, 0);
  }, [itinerary, userProfile]);

  const showToast = (message: string) => {
    setToastMsg(message);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleLogin = (code: string) => {
    setIsAuthenticated(true);
    setUserProfile({
      name: 'Imada Tumugi',
      authCode: code,
      headcount: 15,
      membershipLevel: 'Gold',
      points: 12450
    });
    setTripContext({
      destination: 'Taipei, Taiwan',
      startDate: '2026-04-10',
      endDate: '2026-04-12',
      status: ItineraryStatus.DRAFT
    });
  };

  const addToItinerary = (item: TravelItem, day: number = 1) => {
    if (tripContext?.status !== ItineraryStatus.DRAFT) {
      showToast("Itinerary is locked. Contact agent to edit.");
      return;
    }
    if (item.category === 'STAY' && day === 3) {
      showToast("Accommodation is only available for Day 1 and 2.");
      return;
    }

    const newItem: ItineraryItem = {
      ...item,
      instanceId: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      day: day,
      startTime: '09:00',
      order: itinerary.length
    };
    setItinerary(prev => [...prev, newItem]);
    showToast(`Added ${item.name} to Day ${day}`);
  };

  const handleOpenClearConfirm = () => {
    if (tripContext?.status !== ItineraryStatus.DRAFT) {
      showToast("Itinerary is locked. Contact agent to edit.");
      return;
    }
    if (itinerary.length === 0) {
      showToast("Itinerary is already empty.");
      return;
    }
    setIsClearConfirmOpen(true);
  };

  const handleClearItinerary = () => {
    setItinerary([]);
    setIsClearConfirmOpen(false);
    showToast("Itinerary cleared successfully!");
  };

  const togglePackageExpand = (pkgId: string) => {
    setExpandedPackageIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(pkgId)) {
        newSet.delete(pkgId);
      } else {
        newSet.add(pkgId);
      }
      return newSet;
    });
  };

  const handleApplyPackage = (pkg: TravelPackage) => {
    if (tripContext?.status !== ItineraryStatus.DRAFT) {
      showToast("Itinerary is locked. Cannot apply package.");
      return;
    }

    const newItems: ItineraryItem[] = pkg.items.map((pkgItem, index) => {
      const originalItem = MOCK_ITEMS.find(i => i.id === pkgItem.itemId);
      if (!originalItem) return null;
      
      return {
        ...originalItem,
        instanceId: `pkg_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 5)}`,
        day: pkgItem.day,
        startTime: pkgItem.startTime,
        order: index
      };
    }).filter((i): i is ItineraryItem => i !== null);

    setItinerary(newItems);
    showToast(`Applied "${pkg.title}" package!`);
    setActiveTab('ITINERARY');
  };

  const updateItemDetails = (instanceId: string, updates: Partial<ItineraryItem>) => {
    if (tripContext?.status !== ItineraryStatus.DRAFT) return;
    setItinerary(prev => prev.map(item => 
      item.instanceId === instanceId ? { ...item, ...updates } : item
    ));
  };

  const removeFromItinerary = (instanceId: string) => {
    if (tripContext?.status !== ItineraryStatus.DRAFT) return;
    setItinerary(prev => prev.filter(i => i.instanceId !== instanceId));
  };

  const handleSubmitItinerary = () => {
    if (!tripContext) return;
    setTripContext({ ...tripContext, status: ItineraryStatus.SUBMITTED });
    setShowSuccessSplash(true);
    showToast("Itinerary Submitted Successfully!");
  };

  const openSummaryModal = () => {
    setShowSuccessSplash(false);
    setIsSubmitModalOpen(true);
  };

  const openMembershipModal = () => {
    setIsMembershipModalOpen(true);
  };

  const handleDownloadPDF = () => {
    showToast("Preparing your PDF download... (Mock)");
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const filteredItems = MOCK_ITEMS.filter(item => item.category === activeCategory);
  const isLocked = tripContext?.status !== ItineraryStatus.DRAFT;

  return (
    <div className="min-h-screen bg-gray-50 pb-24 relative">
      {toastMsg && <Toast message={toastMsg} />}
      
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 text-white font-bold p-1 rounded text-lg">LION</div>
            <div>
              <h1 className="font-bold text-gray-800 leading-tight">{tripContext?.destination}</h1>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <Icons.Calendar className="w-3 h-3" />
                {tripContext?.startDate} - {tripContext?.endDate} (3 Days)
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-4">
               <CurrencySelector current={currency} onSelect={setCurrency} />
               <div className="flex flex-col items-end border-l border-gray-100 pl-4">
                 <span className="text-sm font-medium text-gray-900">{userProfile?.name}</span>
                 <span className="text-xs text-amber-600 font-bold uppercase tracking-tighter">{userProfile?.membershipLevel} Tier</span>
               </div>
             </div>
             
             {isLocked && (
                <span className="hidden sm:flex bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold border border-red-700 items-center gap-1 shadow-sm">
                  <Icons.CheckCircle className="w-3 h-3" />
                  Order Locked
                </span>
             )}
             
             <button 
               onClick={openMembershipModal}
               className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-xl text-sm font-bold transition shadow-sm flex items-center gap-2 group active:scale-95"
             >
               <Icons.Crown className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform membership" />
               Membership
             </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-t border-gray-100">
          <button onClick={() => setActiveTab('DISCOVERY')} className={`flex-1 py-3 text-sm font-medium text-center transition ${activeTab === 'DISCOVERY' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:text-gray-700'}`}>Discovery</button>
          <button onClick={() => setActiveTab('PACKAGES')} className={`flex-1 py-3 text-sm font-medium text-center transition ${activeTab === 'PACKAGES' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:text-gray-700'}`}>Packages</button>
          <button onClick={() => setActiveTab('ITINERARY')} className={`flex-1 py-3 text-sm font-medium text-center transition ${activeTab === 'ITINERARY' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:text-gray-700'}`}>My Itinerary <span className="ml-1 bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">{itinerary.length}</span></button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'DISCOVERY' && (
          <div className="animate-fade-in">
            <div className="flex overflow-x-auto gap-2 mb-6 pb-2 no-scrollbar">
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <button key={key} onClick={() => setActiveCategory(key as Category)} className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${activeCategory === key ? 'bg-red-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>{label}</button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition group">
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gray-800 flex items-center gap-1"><Icons.Star className="w-3 h-3 text-yellow-400" /> {item.rating}</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 text-lg line-clamp-1">{item.name}</h3>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">{item.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">{item.tags.map(tag => (<span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{tag}</span>))}</div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-bold text-red-600">{formatPrice(item.price)}</span>
                      <DaySelectorDropdown item={item} isLocked={isLocked} onSelect={(d) => addToItinerary(item, d)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'PACKAGES' && (
           <div className="animate-fade-in">
             <div className="mb-8 text-center"><h2 className="text-3xl font-bold text-gray-800 mb-2">Curated Itinerary Packages</h2><p className="text-gray-500">Choose a package to instantly populate your trip with our best recommendations.</p></div>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {MOCK_PACKAGES.map((pkg, index) => {
                   const isRecommended = index === 1; 
                   const isExpanded = expandedPackageIds.has(pkg.id);
                   const displayItems = isExpanded ? pkg.items : pkg.items.slice(0, 3);
                   return (
                     <div key={pkg.id} className={`bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col relative transition-all duration-300 hover:shadow-xl ${isRecommended ? 'border-2 border-red-500 ring-4 ring-red-100' : 'border border-gray-100'}`}>
                        {isRecommended && (<div className="bg-red-600 text-white text-xs font-bold px-3 py-1 absolute top-0 right-0 rounded-bl-lg z-10 uppercase tracking-wide">Best Value</div>)}
                        <div className="h-48 overflow-hidden relative shrink-0"><img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6"><h3 className="text-white text-2xl font-bold leading-tight">{pkg.title}</h3><p className="text-white/80 text-sm">{pkg.subTitle}</p></div></div>
                        <div className="p-6 flex-1 flex flex-col">
                           <div className="flex flex-wrap gap-2 mb-4">{pkg.tags.map(tag => (<span key={tag} className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${isRecommended ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'}`}>{tag}</span>))}</div>
                           {!isExpanded && (<p className="text-gray-600 text-sm mb-6 flex-1 leading-relaxed line-clamp-2">{pkg.description}</p>)}
                           <div className="bg-gray-50 rounded-xl p-4 mb-6">
                             <div className="text-[10px] text-gray-400 uppercase tracking-widest font-black mb-3 border-b border-gray-200 pb-1">{isExpanded ? 'Full Itinerary' : 'Includes Highlights'}</div>
                             <ul className="space-y-3">
                               {displayItems.map((pItem, i) => {
                                  const refItem = MOCK_ITEMS.find(m => m.id === pItem.itemId);
                                  return (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700 animate-fade-in-down"><div className="mt-1"><Icons.CheckCircle className="w-4 h-4 text-green-500 shrink-0" /></div><div className="flex-1"><div className="font-bold text-gray-900">{refItem?.name || "Activity Item"}</div>{isExpanded && (<div className="text-[10px] text-gray-500 mt-0.5 font-medium">Day {pItem.day} • {pItem.startTime}</div>)}</div></li>
                                  )
                               })}
                               <button onClick={() => togglePackageExpand(pkg.id)} className="w-full mt-2 text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 py-2 rounded-lg transition-colors flex items-center justify-center gap-1 border border-dashed border-red-200">{isExpanded ? (<>Show Less <Icons.X className="w-3 h-3" /></>) : (<>+ {pkg.items.length - 3} more items...</>)}</button>
                             </ul>
                           </div>
                           <div className="mt-auto pt-4 border-t border-gray-100"><div className="flex justify-between items-end mb-4"><div><div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Per Person</div><div className="text-2xl font-bold text-gray-900">{formatPrice(pkg.pricePerPerson)}</div></div></div><button disabled={isLocked} onClick={() => handleApplyPackage(pkg)} className={`w-full py-3 rounded-xl font-bold transition shadow-lg flex items-center justify-center gap-2 ${isLocked ? 'bg-gray-100 text-gray-300 cursor-not-allowed shadow-none' : isRecommended ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-200' : 'bg-gray-900 hover:bg-black text-white shadow-gray-200'}`}>{isLocked ? 'Itinerary Locked' : 'Apply This Plan'} {!isLocked && <Icons.ArrowRight className="w-4 h-4" />}</button></div>
                        </div>
                     </div>
                   )
                })}
             </div>
           </div>
        )}

        {activeTab === 'ITINERARY' && (
          <div className="animate-fade-in flex flex-col lg:flex-row gap-6">
            <div className="flex-1 space-y-4">
              {itinerary.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                  <div className="flex justify-center mb-4"><Icons.Calendar className="w-12 h-12 text-gray-200" /></div>
                  <p className="text-gray-400 font-medium">Your itinerary is empty.</p>
                  <div className="flex justify-center gap-4 mt-6">
                    <button onClick={() => setActiveTab('PACKAGES')} className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold shadow-md hover:bg-red-700 transition">Explore Packages</button>
                    <button onClick={() => setActiveTab('DISCOVERY')} className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg font-bold hover:bg-gray-50 transition">Browse Activities</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4 px-2">
                    <h2 className="text-xl font-black text-gray-800">Trip Timeline</h2>
                    <button onClick={handleOpenClearConfirm} className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors px-2 py-1 hover:bg-red-50 rounded"><Icons.Trash className="w-3 h-3" /> Clear All</button>
                  </div>
                  {TRIP_DAYS.map(day => {
                    const allDayItems = itinerary.filter(item => item.day === day);
                    const activities = allDayItems.filter(item => item.category !== 'STAY').sort((a, b) => a.startTime.localeCompare(b.startTime));
                    const stays = allDayItems.filter(item => item.category === 'STAY');
                    
                    return (
                        <div key={day} className="relative pb-8">
                          <div className="absolute top-8 left-4 h-full w-0.5 bg-gray-200 -z-10"></div>
                          <h3 className="font-bold text-gray-700 mb-6 flex items-center gap-2 bg-gray-50 w-fit pr-4 z-10"><div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm">D{day}</div><span className="text-lg">Day {day}</span></h3>
                          <div className="space-y-4 ml-2 mb-6">
                            {activities.length === 0 && stays.length === 0 && (<div className="ml-10 text-sm text-gray-400 italic mb-6">No activities planned for Day {day}.</div>)}
                            {activities.map((item, idx) => {
                                return (
                                  <div key={item.instanceId}>
                                    <div className="flex gap-4 group items-start">
                                      <div className="w-2 h-2 rounded-full bg-red-600 mt-6 shrink-0 relative z-10 ring-4 ring-white"></div>
                                      <div className="flex-1 bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4">
                                        <img src={item.image} alt={item.name} className="w-full sm:w-20 h-20 rounded-lg object-cover" />
                                        <div className="flex-1">
                                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                            <div><div className="text-xs text-gray-500 font-bold uppercase">{item.category}</div><h4 className="font-bold text-gray-800">{item.name}</h4></div>
                                            <div className="text-sm text-red-600 font-bold">{formatPrice(item.price)}</div>
                                          </div>
                                          <div className="mt-3 flex flex-wrap items-center gap-2">
                                              <select disabled={isLocked} value={item.day} onChange={(e) => updateItemDetails(item.instanceId, { day: parseInt(e.target.value) })} className="text-xs bg-gray-100 border-none rounded px-2 py-1 text-gray-700 cursor-pointer focus:ring-1 focus:ring-red-500 disabled:opacity-50">{TRIP_DAYS.filter(d => item.category !== 'STAY' || d !== 3).map(d => (<option key={d} value={d}>Day {d}</option>))}</select>
                                              <select disabled={isLocked} value={item.startTime} onChange={(e) => updateItemDetails(item.instanceId, { startTime: e.target.value })} className="text-xs bg-gray-100 border-none rounded px-2 py-1 text-gray-700 cursor-pointer focus:ring-1 focus:ring-red-500 disabled:opacity-50">{TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}</select>
                                          </div>
                                        </div>
                                        {!isLocked && (<button onClick={() => removeFromItinerary(item.instanceId)} className="self-start sm:self-center text-gray-300 hover:text-red-500 p-2 sm:opacity-0 group-hover:opacity-100 transition"><Icons.Trash className="w-5 h-5" /></button>)}
                                      </div>
                                    </div>
                                  </div>
                                );
                            })}
                          </div>
                          {stays.length > 0 && (
                            <div className="ml-2 pl-10 relative">
                              <div className="absolute -left-[1px] top-4 w-8 h-0.5 bg-indigo-200"></div>
                              <div className="absolute -left-[9px] top-1.5 w-6 h-6 bg-indigo-50 rounded-full border border-indigo-200 flex items-center justify-center z-20"><Icons.Moon className="w-3 h-3 text-indigo-600" /></div>
                              {stays.map(stay => (
                                <div key={stay.instanceId} className="bg-slate-800 rounded-xl p-4 shadow-md text-white mb-4 relative overflow-hidden group border border-slate-700"><div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl -mr-8 -mt-8 pointer-events-none"></div><div className="flex gap-4 relative z-10"><img src={stay.image} alt={stay.name} className="w-20 h-20 rounded-lg object-cover border border-white/10" /><div className="flex-1"><div className="flex justify-between items-start"><div><div className="text-xs text-indigo-300 font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><Icons.Moon className="w-3 h-3" /> Night Stay</div><h4 className="font-bold text-lg leading-tight">{stay.name}</h4></div>{!isLocked && (<button onClick={() => removeFromItinerary(stay.instanceId)} className="text-white/30 hover:text-red-400 transition p-1"><Icons.Trash className="w-4 h-4" /></button>)}</div><div className="mt-3 flex items-center gap-3 text-sm"><select disabled={isLocked} value={stay.day} onChange={(e) => updateItemDetails(stay.instanceId, { day: parseInt(e.target.value) })} className="text-xs bg-white/10 border-none rounded px-2 py-1 text-indigo-100 cursor-pointer focus:ring-1 focus:ring-indigo-400 disabled:opacity-50">{TRIP_DAYS.filter(d => d !== 3).map(d => (<option key={d} value={d}>Day {d}</option>))}</select><span className="text-gray-400">{formatPrice(stay.price)}</span></div></div></div></div>
                              ))}
                            </div>
                          )}
                        </div>
                    )
                  })}
                </>
              )}
            </div>
            <div className="lg:w-1/3 h-fit sticky top-24"><div className="bg-gray-200 rounded-xl h-96 lg:h-[600px] border border-gray-300 relative overflow-hidden shadow-inner"><TripMap items={itinerary} /></div></div>
          </div>
        )}
      </main>

      {/* Membership Modal */}
      {isMembershipModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl relative flex flex-col">
            <button onClick={() => setIsMembershipModalOpen(false)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition"><Icons.X className="w-5 h-5" /></button>
            
            <div className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-amber-100 p-3 rounded-2xl"><Icons.Crown className="w-8 h-8 text-amber-600" /></div>
                <div><h2 className="text-2xl font-black text-gray-900 leading-none mb-1">Lion Member Hub</h2><p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Exclusive Perks & Rewards</p></div>
              </div>

              {/* Membership Tier Card */}
              <div className="bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden mb-8">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-black/10 rounded-full blur-3xl"></div>
                
                <div className="relative flex justify-between items-start mb-12">
                  <div><div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">Premium Status</div><div className="text-3xl font-black tracking-tighter uppercase">{userProfile?.membershipLevel} Level</div></div>
                  <Icons.Crown className="w-12 h-12 opacity-30" />
                </div>

                <div className="relative flex justify-between items-end">
                  <div><div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">Member Name</div><div className="text-xl font-bold">{userProfile?.name}</div></div>
                  <div className="text-right"><div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">Accumulated Points</div><div className="text-xl font-bold">{userProfile?.points.toLocaleString()} pts</div></div>
                </div>
              </div>

              {/* Progress to next level */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Progress to Diamond</span>
                  <span className="text-amber-600 font-black text-xs">{Math.round((userProfile!.points / DIAMOND_THRESHOLD) * 100)}%</span>
                </div>
                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-amber-500 rounded-full transition-all duration-1000" style={{ width: `${(userProfile!.points / DIAMOND_THRESHOLD) * 100}%` }}></div>
                </div>
                <p className="text-[10px] text-gray-500 font-medium">{(DIAMOND_THRESHOLD - userProfile!.points).toLocaleString()} points until <span className="text-cyan-600 font-bold uppercase">Diamond</span> tier unlock</p>
              </div>

              {/* Benefits List */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Your Entitled Benefits</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Priority Agent Handoff', icon: <Icons.CheckCircle className="w-4 h-4 text-green-500" /> },
                    { label: '10% Hotel Discount', icon: <Icons.CheckCircle className="w-4 h-4 text-green-500" /> },
                    { label: 'Lounge Access (1x)', icon: <Icons.CheckCircle className="w-4 h-4 text-green-500" /> },
                    { label: 'Points Multiplier (1.5x)', icon: <Icons.CheckCircle className="w-4 h-4 text-green-500" /> },
                    { label: 'Free Room Upgrades', icon: <Icons.CheckCircle className="w-4 h-4 text-green-500" /> },
                    { label: 'Dedicated Concierge', icon: <Icons.CheckCircle className="w-4 h-4 text-green-500" /> }
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs font-bold text-gray-700">
                      {benefit.icon}
                      {benefit.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clear Confirmation Modal */}
      {isClearConfirmOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[110] flex items-center justify-center p-4 animate-fade-in">
           <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl p-8 text-center">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icons.Trash className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Clear Itinerary?</h3>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">Are you sure you want to remove all items? This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setIsClearConfirmOpen(false)} className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition">Cancel</button>
                <button onClick={handleClearItinerary} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition shadow-lg shadow-red-100">Clear All</button>
              </div>
           </div>
        </div>
      )}

      {/* Summary / Preview Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in">
          <div className={`bg-white rounded-3xl w-full max-w-2xl shadow-2xl transition-all duration-500 transform overflow-hidden ${showSuccessSplash ? 'scale-105' : 'scale-100'}`}>
            {showSuccessSplash ? (
               <div className="p-10 text-center animate-fade-in">
                 <div className="flex justify-center mb-6"><div className="bg-red-50 p-6 rounded-full ring-8 ring-red-50/50 animate-bounce-short"><Icons.CheckCircle className="w-20 h-20 text-red-600" /></div></div>
                 <h2 className="text-4xl font-black text-gray-900 mb-2">Itinerary Submitted!</h2>
                 <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto">Excellent choice, <span className="font-bold text-red-600">{userProfile?.name}</span>! Your plan is now with our experts.</p>
                 
                 <div className="space-y-4 max-w-md mx-auto mb-10">
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center">
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Estimated Amount</div>
                        <div className="text-3xl font-black text-gray-900">{formatPrice(totalCostTWD)}</div>
                    </div>

                    <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 flex items-start gap-4 text-left">
                        <div className="bg-blue-600 text-white p-2 rounded-lg mt-1"><Icons.Bot className="w-5 h-5" /></div>
                        <div>
                            <h4 className="text-blue-900 font-bold text-sm mb-1">Next Steps: Customer Service Contact</h4>
                            <p className="text-blue-800/70 text-xs leading-relaxed">
                                A dedicated Lion Travel specialist will review your itinerary and contact you via phone or email within <span className="font-bold">24 hours</span> to provide a firm quote and complete your booking.
                            </p>
                        </div>
                    </div>
                 </div>

                 <div className="flex flex-col sm:flex-row gap-3">
                   <button onClick={handleDownloadPDF} className="flex-1 py-4 bg-white border-2 border-gray-100 hover:border-gray-200 text-gray-700 rounded-2xl font-bold transition flex items-center justify-center gap-2">
                     <Icons.ArrowRight className="w-5 h-5 rotate-90" />
                     Download PDF
                   </button>
                   <button onClick={() => setShowSuccessSplash(false)} className="flex-1 py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition shadow-lg flex items-center justify-center gap-2">
                     <Icons.Menu className="w-5 h-5" />
                     View Summary
                   </button>
                 </div>
               </div>
            ) : (
              <div className="flex flex-col max-h-[90vh]">
                <div className="p-8 pb-4 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-3xl font-black text-gray-900 leading-tight">{isLocked ? 'Your Final Trip' : 'Review & Submit'}</h2>
                    <button onClick={() => setIsSubmitModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition"><Icons.X className="w-6 h-6" /></button>
                  </div>
                  <p className="text-gray-500 text-sm">Review your curated trip before it's sent to our agents for final verification.</p>
                  
                  {/* Total Price Section */}
                  <div className="mt-6 bg-red-600 rounded-2xl p-6 text-white flex justify-between items-center transition-all">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Total Estimated Cost</div>
                      <div className="text-sm font-medium opacity-90">Calculated for {userProfile?.headcount} people</div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black">{formatPrice(totalCostTWD)}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto px-8 py-4 space-y-6">
                  {TRIP_DAYS.map(day => { 
                    const items = itinerary.filter(i => i.day === day).sort((a,b) => a.startTime.localeCompare(b.startTime)); 
                    if (items.length === 0) return null; 
                    return (
                      <div key={day} className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">D{day} Schedule</h4>
                        <ul className="space-y-3">
                          {items.map(item => (
                            <li key={item.instanceId} className="flex items-center gap-4 text-sm bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                              <span className="flex-1 font-bold text-gray-800">{item.name}</span>
                              <span className="text-red-600 font-black text-xs">{formatPrice(item.price)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) 
                  })}
                </div>

                <div className="p-8 pt-4 border-t border-gray-100 flex gap-4 bg-white/50 backdrop-blur-sm">
                  <button onClick={() => setIsSubmitModalOpen(false)} className="flex-1 py-4 border-2 border-gray-200 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition">
                    {isLocked ? 'Close Summary' : 'Keep Editing'}
                  </button>
                  {!isLocked && (
                    <button 
                      onClick={handleSubmitItinerary} 
                      disabled={itinerary.length === 0} 
                      className="flex-1 py-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-2xl font-bold shadow-xl shadow-red-200 flex items-center justify-center gap-2 transform active:scale-95 transition"
                    >
                      Confirm & Submit Order
                      <Icons.ArrowRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom CTA / Total Price Footer */}
      <div className={`fixed bottom-0 left-0 right-0 border-t p-4 z-30 transition-all duration-500 ${isLocked ? 'bg-red-50 border-red-200 shadow-[0_-10px_30px_-1px_rgba(220,38,38,0.1)]' : 'bg-white border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div><div className={`text-xs font-bold uppercase tracking-wider ${isLocked ? 'text-red-500' : 'text-gray-500'}`}>{isLocked ? 'Final Order Total' : `Estimated Total (${userProfile?.headcount} ppl)`}</div><div className={`text-2xl font-bold ${isLocked ? 'text-red-700' : 'text-gray-900'}`}>{formatPrice(totalCostTWD)}</div></div>
          <button onClick={openSummaryModal} className={`px-3 md:px-6 py-3 rounded-xl font-bold shadow-lg transition flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white shadow-red-200`}>{isLocked ? (<><Icons.CheckCircle className="w-5 h-5 summary" /> View Final Itinerary</>) : ('Preview & Submit Plan')}</button>
        </div>
      </div>

      {tripContext && (
         <ChatAgent tripContext={tripContext} itineraryItems={itinerary} />
      )}
    </div>
  );
}

export default App;
