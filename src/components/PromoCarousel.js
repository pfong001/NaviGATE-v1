import React, { useState, useRef, useEffect, useCallback } from "react";
import { View, Text, FlatList } from "react-native";
import { SW, C } from "../constants/theme";

export default function PromoCarousel({ items, autoPlay = true, interval = 4000 }) {
  const [active, setActive] = useState(0);
  const flatRef = useRef(null);
  const timerRef = useRef(null);
  const cardW = SW - 48;

  const startTimer = useCallback(() => {
    if (!autoPlay) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % items.length;
        flatRef.current?.scrollToOffset({
          offset: next * (cardW + 12),
          animated: true,
        });
        return next;
      });
    }, interval);
  }, [items.length, interval, autoPlay, cardW]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const onScroll = (e) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / (cardW + 12));
    if (idx !== active && idx >= 0 && idx < items.length) {
      setActive(idx);
      clearInterval(timerRef.current);
      startTimer();
    }
  };

  return (
    <View style={{ marginBottom: 16 }}>
      <FlatList
        ref={flatRef}
        data={items}
        horizontal
        pagingEnabled={false}
        snapToInterval={cardW + 12}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <View
            style={{
              width: cardW,
              marginRight: 12,
              borderRadius: 16,
              overflow: "hidden",
              backgroundColor: item.bg || C.navyLight,
            }}
          >
            <View
              style={{ padding: 20, minHeight: 110, justifyContent: "flex-end" }}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: item.tagColor || C.gold,
                  fontWeight: "700",
                  marginBottom: 4,
                }}
              >
                {item.tag}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: C.white,
                  fontWeight: "800",
                  marginBottom: 4,
                }}
              >
                {item.title}
              </Text>
              <Text style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
                {item.subtitle}
              </Text>
            </View>
          </View>
        )}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
          gap: 6,
        }}
      >
        {items.map((_, i) => (
          <View
            key={i}
            style={{
              width: active === i ? 18 : 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: active === i ? C.gold : C.grayLight,
            }}
          />
        ))}
      </View>
    </View>
  );
}
