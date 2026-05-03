'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Bebas_Neue } from 'next/font/google';
const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400' });

import { Card } from '@/components/Card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

import { Coffee } from '@/types/coffee';

import { fetchCoffees, fetchNewCoffeeModal } from '@/services/fetchCoffees';
import { fetchGeneralInfo } from '@/services/fetchGeneralInfo';

export default function CoffeePage() {
  const router = useRouter();

  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [pageInfo, setPageInfo] = useState<any>(null);
  const [modalContent, setModalContent] = useState<any>(null);

  const [activeFilter, setActiveFilter] = useState("All");
  const [filters, setFilters] = useState<string[]>(["All"]);

  useEffect(() => {
    fetchCoffees().then(setCoffees).catch(console.error);
    fetchGeneralInfo().then(setPageInfo).catch(console.error);
    fetchNewCoffeeModal().then(setModalContent).catch(console.error)
  }, []);

  useEffect(() => {
    const types = Array.from(new Set(coffees.map(c => c.type)));
    setFilters(["All", ...types]);
  }, [coffees]);

  const uniqueCoffees = Array.from(new Map(coffees.map(c => [c.id, c])).values());
  const filteredCoffees =
    activeFilter === "All"
      ? uniqueCoffees
      : uniqueCoffees.filter(c => c.type === activeFilter);
      
  if (!pageInfo) return <p>Loading...</p>;

  return (
    <main className="bg-black min-h-screen">
      <Header header={pageInfo.header} />

      <section
        className="fade-bg relative z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${pageInfo.coffee_page.background_image_url})` }}
      >
        <div className="px-10 py-20 max-w-7xl mx-auto relative z-10">
          <h1 className={`${bebas.className} coffee-page-title text-center md:text-left`}>
            {pageInfo.coffee_page.title}
          </h1>
          <p className={`coffee-page-description mt-2 text-center md:text-left`}>
            {pageInfo.coffee_page.description}
          </p>
          <div className="flex justify-center md:justify-start">
            <button
              onClick={() => router.push('/new-coffee')}
              className="primary-button mt-6"
            >
              {pageInfo.coffee_page.create_button}
            </button>
          </div>
        </div>
      </section>

      <section className="bg-black py-0 sm:py-10">
        <div className="max-w-7xl mx-auto">
          <h2 className={`${bebas.className} text-center py-10 coffee-section-title`}>
            {pageInfo.coffee_page.cards_title}
          </h2>

          <div className="max-w-7xl mx-auto filter-container">
            {filters.map(f => (
              <button
                key={f}
                className={`${activeFilter === f ? "active" : ""}`}
                onClick={() => setActiveFilter(f)}>
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center mx-auto">
            {filteredCoffees.map(({ id, title, description, imageUrl, type, color, price }) => (
              <Card
                key={id}
                title={title}
                description={description}
                imageUrl={imageUrl}
                type={type}
                color={color}
                price={price}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer footer={pageInfo.footer} />
    </main>
  );
}
