import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { C } from "../constants/theme";
import TopSpacer from "../components/TopSpacer";
import ScreenHeader from "../components/ScreenHeader";

export default function TSAScreen({ goHome }) {
  const [showTips, setShowTips] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [reporting, setReporting] = useState(null);
  const [reportVal, setReportVal] = useState(10);
  const [reported, setReported] = useState(false);
  const tips = ["Have ID ready", "Remove laptops/liquids", "Easy-to-remove shoes", "Consider PreCheck"];
  const checkpoints = [
    { id: "A", name: "Checkpoint A", loc: "Terminal 2 \u00b7 Level 1", wait: 12, trend: "steady", reports: 24, lastReport: "3 min ago", lanes: ["Standard", "PreCheck"], hours: "4:00 AM - 11:00 PM" },
    { id: "B", name: "Checkpoint B", loc: "Terminal 4 \u00b7 Level 1", wait: 8, trend: "decreasing", reports: 18, lastReport: "7 min ago", lanes: ["Standard", "PreCheck", "CLEAR"], hours: "4:30 AM - 10:30 PM" },
    { id: "C", name: "Checkpoint C", loc: "Terminal 2 \u00b7 Level 1 (South)", wait: 22, trend: "increasing", reports: 31, lastReport: "1 min ago", lanes: ["Standard"], hours: "5:00 AM - 9:00 PM" },
  ];
  const getColor = (w) => (w <= 10 ? C.green : w <= 20 ? C.orange : C.red);
  const getTrend = (t) => (t === "steady" ? "\u2192 Steady" : t === "decreasing" ? "\u2193 Decreasing" : "\u2191 Increasing");

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <TopSpacer />
      <ScreenHeader title="KONT \u00b7 LIVE" subtitle="TSA Checkpoint Wait Times" goHome={goHome} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 12 }}>
        <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
          {[{ l: "Avg Wait", v: "14 min", c: C.orange }, { l: "Reports", v: "73", c: C.blue }, { l: "Best", v: "Chk B", c: C.green }].map((s) => (
            <View key={s.l} style={{ flex: 1, backgroundColor: C.white, borderRadius: 12, padding: 10, alignItems: "center" }}>
              <Text style={{ fontSize: 16, fontWeight: "800", color: s.c }}>{s.v}</Text>
              <Text style={{ fontSize: 10, color: C.gray, marginTop: 2 }}>{s.l}</Text>
            </View>
          ))}
        </View>
        <View style={{ backgroundColor: C.white, borderRadius: 14, marginBottom: 12, overflow: "hidden" }}>
          <TouchableOpacity onPress={() => setShowTips(!showTips)} style={{ padding: 12, paddingHorizontal: 16, flexDirection: "row", justifyContent: "space-between", backgroundColor: C.goldBg }}>
            <Text style={{ fontWeight: "700", fontSize: 13, color: C.navy }}>{"\uD83D\uDCA1"} TSA Tips</Text>
            <Text style={{ color: C.gray }}>{showTips ? "\u25B2" : "\u25BC"}</Text>
          </TouchableOpacity>
          {showTips && (
            <View style={{ padding: 16, paddingTop: 8 }}>
              {tips.map((t) => (
                <Text key={t} style={{ fontSize: 12, color: C.navy, paddingVertical: 4 }}>{"\u2713"} {t}</Text>
              ))}
            </View>
          )}
        </View>
        {checkpoints.map((cp) => (
          <View key={cp.id} style={{ backgroundColor: C.white, borderRadius: 14, marginBottom: 10, overflow: "hidden" }}>
            <TouchableOpacity onPress={() => setExpanded(expanded === cp.id ? null : cp.id)} style={{ padding: 14, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <View style={{ width: 42, height: 42, borderRadius: 12, backgroundColor: getColor(cp.wait) + "18", alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ fontSize: 16, fontWeight: "800", color: getColor(cp.wait) }}>{cp.wait}</Text>
                </View>
                <View>
                  <Text style={{ fontWeight: "700", fontSize: 14, color: C.navy }}>{cp.name}</Text>
                  <Text style={{ fontSize: 11, color: C.gray }}>{cp.wait} min {"\u00b7"} {getTrend(cp.trend)}</Text>
                </View>
              </View>
              <Text style={{ color: C.gray }}>{expanded === cp.id ? "\u25B2" : "\u25BC"}</Text>
            </TouchableOpacity>
            {expanded === cp.id && (
              <View style={{ paddingHorizontal: 14, paddingBottom: 14, borderTopWidth: 1, borderTopColor: "#eee", paddingTop: 12 }}>
                <Text style={{ fontSize: 12, color: C.gray, marginBottom: 4 }}>{cp.loc} {"\u00b7"} {cp.hours}</Text>
                <Text style={{ fontSize: 12, color: C.gray, marginBottom: 8 }}>{cp.reports} reports {"\u00b7"} Last: {cp.lastReport}</Text>
                <View style={{ flexDirection: "row", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
                  {cp.lanes.map((l) => (
                    <View key={l} style={{ backgroundColor: C.goldBg, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 3 }}>
                      <Text style={{ color: C.gold, fontSize: 11, fontWeight: "600" }}>{l}</Text>
                    </View>
                  ))}
                </View>
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <TouchableOpacity onPress={() => { setReporting(cp.id); setReported(false); setReportVal(10); }} style={{ flex: 1, backgroundColor: C.gold, borderRadius: 8, padding: 10, alignItems: "center" }}>
                    <Text style={{ color: C.navy, fontWeight: "600", fontSize: 12 }}>{"\uD83D\uDCDD"} Report</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1, backgroundColor: C.navyLight, borderRadius: 8, padding: 10, alignItems: "center" }}>
                    <Text style={{ color: C.white, fontWeight: "600", fontSize: 12 }}>{"\uD83E\uDDED"} Navigate</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
      {reporting && (
        <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: C.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 24, elevation: 10 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
            <Text style={{ fontWeight: "700", fontSize: 16, color: C.navy }}>Report Wait Time</Text>
            <TouchableOpacity onPress={() => setReporting(null)}>
              <Text style={{ fontSize: 18, color: C.gray }}>{"\u2715"}</Text>
            </TouchableOpacity>
          </View>
          {reported ? (
            <View style={{ alignItems: "center", paddingVertical: 20 }}>
              <Text style={{ fontSize: 48 }}>{"\u2705"}</Text>
              <Text style={{ fontWeight: "700", fontSize: 16, color: C.navy, marginTop: 8 }}>Thanks for reporting!</Text>
              <Text style={{ fontSize: 13, color: C.gray, marginTop: 4 }}>Your report helps other travelers</Text>
            </View>
          ) : (
            <>
              <View style={{ alignItems: "center", marginBottom: 16 }}>
                <Text style={{ fontSize: 48, fontWeight: "800", color: getColor(reportVal) }}>{reportVal}</Text>
                <Text style={{ fontSize: 14, color: C.gray }}>minutes</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 8, justifyContent: "center", marginBottom: 20, flexWrap: "wrap" }}>
                {[5, 10, 15, 20, 30, 45].map((v) => (
                  <TouchableOpacity key={v} onPress={() => setReportVal(v)} style={{ paddingVertical: 8, paddingHorizontal: 16, borderRadius: 10, backgroundColor: reportVal === v ? C.gold : C.grayLight }}>
                    <Text style={{ color: reportVal === v ? C.navy : C.gray, fontWeight: "700", fontSize: 13 }}>{v}m</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity onPress={() => setReported(true)} style={{ backgroundColor: C.gold, borderRadius: 12, padding: 14, alignItems: "center" }}>
                <Text style={{ color: C.navy, fontSize: 15, fontWeight: "700" }}>Submit Report</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
}
