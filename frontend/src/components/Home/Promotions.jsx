import React from "react";
import { Sparkles, Clock, Tag } from "lucide-react";

export default function Promotions() {
  const promotions = [
    {
      title: "Flash Sale",
      description: "50% off on selected items",
      icon: <Clock className="w-6 h-6" />,
      color: "from-orange-400 to-pink-500",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "New Arrivals",
      description: "Check out our latest collection",
      icon: <Sparkles className="w-6 h-6" />,
      color: "from-blue-400 to-indigo-500",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Special Deals",
      description: "Buy one get one free",
      icon: <Tag className="w-6 h-6" />,
      color: "from-green-400 to-emerald-500",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <section id="promotions" className="promotions-section">
      <h2 className="promotions-title">
        <Sparkles className="w-8 h-8 text-yellow-500" />
        Hot Promotions
      </h2>
      <div className="promotions-grid">
        {promotions.map((promo, index) => (
          <div key={index} className="promotion-card">
            <div
              className={`absolute inset-0 bg-gradient-to-r ${promo.color} opacity-90`}
            />
            <div className="promotion-content">
              <div className="flex items-start justify-between mb-4">
                <div className="promotion-icon">{promo.icon}</div>
              </div>
              <div className="flex-grow">
                <h3 className="promotion-heading">{promo.title}</h3>
                <p className="promotion-description">{promo.description}</p>
              </div>
              <button className="promotion-button">Learn More</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
