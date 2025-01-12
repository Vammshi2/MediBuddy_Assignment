import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screenContainer: {
    display: "flex",
    maxWidth: 328,
    flexDirection: "column",
    alignItems: "stretch",
  },
  headerContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  titleContainer: {
    alignSelf: "stretch",
    minWidth: 240,
    marginVertical: "auto",
    fontFamily: "Lexend Deca",
    fontSize: 16,
    color: "#2E3742",
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 24,
    flex: 1,
    flexShrink: 1,
  },
  seeAllContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  seeAllButton: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
  },
  seeAllText: {
    fontFamily: "Lexend Deca",
    fontSize: 14,
    color: "#0066DC",
    fontWeight: "500",
    letterSpacing: 0,
    lineHeight: 20,
  },
  cardsContainer: {
    display: "flex",
    marginTop: 16,
    width: "100%",
    gap: 16,
  },
});

export default styles;
