import 'dart:convert';

import 'package:flutter/material.dart';
import 'config.dart';
import 'package:http/http.dart' as http;
import 'package:flutterproject/app_state.dart';
import 'package:provider/provider.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  late String email;
  late int totalExpense = 0;
  late int totalIncome = 0;
  List<Map<String, dynamic>> recentExpenses = [];
  List<Map<String, dynamic>> recentIncomes = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    final appState = Provider.of<AppState>(context, listen: false);
    email = appState.userDetails!['email'];
    print(email);
    fetchDataforRecentDetails();
  }

  void fetchDataforRecentDetails() async {
    try {
      var expresponse = await http.get(
          Uri.parse('$getRecentExpenses?email=${Uri.encodeComponent(email)}'),
          headers: {"Content-Type": "application/json"});

      var incresponse = await http.get(
          Uri.parse('$getRecentIncomes?email=${Uri.encodeComponent(email)}'),
          headers: {"Content-Type": "application/json"});

      if (expresponse.statusCode == 200 && incresponse.statusCode == 200) {
        var jsonResponseExpense = jsonDecode(expresponse.body);
        var jsonResponseIncome = jsonDecode(incresponse.body);

        if (jsonResponseIncome['status'] && jsonResponseIncome['item']!=null && jsonResponseExpense['item']!=null&& jsonResponseExpense['status']) {
          var expdata = jsonResponseExpense['item'];
          var incdata = jsonResponseIncome['item'];
          recentExpenses = List<Map<String, dynamic>>.from(expdata);
          print(recentExpenses);
          recentIncomes = List<Map<String, dynamic>>.from(incdata);
        } else {
          throw Exception('Failed to load data');
        }
      } else {
        throw Exception('Failed to fetch data');
      }
    } catch (e) {
      print('Eror while fetching data. ${e}');
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<AppState>(context);
    final userDetails = appState.userDetails;

    return Scaffold(
      appBar: AppBar(
        title: Row(children: [
          Image.asset(
            'assets/images/logo.png',
            width: 40,
            height: 40,
          ),
          const SizedBox(
            width: 10,
          ),
          const Text(
            'MoneyTracker',
            style: TextStyle(
              fontWeight: FontWeight.bold,
              color: Colors.black,
            ),
          ),
        ]),
        backgroundColor: Colors.white,
        automaticallyImplyLeading: false,
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(1.0),
          child: Container(
            color: Colors.grey,
            height: 1.0,
          ),
        ),
      ),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Center(
                      child: Text(
                        "Welcome, ${userDetails?['email'] ?? 'Guest'}",
                        style: const TextStyle(
                            fontSize: 18, fontWeight: FontWeight.bold),
                      ),
                    ),
                    const SizedBox(height: 20),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        _buildInfoCard(
                            'Total Income', totalIncome, Colors.green),
                        _buildInfoCard(
                            'Total Expense', totalExpense, Colors.red),
                      ],
                    ),
                    const SizedBox(height: 20),
                    _buildRecentList(
                        'Recent Expenses', recentExpenses, Colors.red),
                    const SizedBox(height: 20),
                    _buildRecentList(
                        'Recent Incomes', recentIncomes, Colors.green),
                  ],
                ),
              ),
            ),
      bottomNavigationBar: _buildBottomNavBar(),
      floatingActionButton: _buildFloatingActionButton(),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
    );
  }

  Widget _buildInfoCard(String title, int value, Color valuecolor) {
    return Container(
      width: MediaQuery.of(context).size.width * 0.4,
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.2),
            spreadRadius: 2,
            blurRadius: 5,
          ),
        ],
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Text(title,
              style:
                  const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          const SizedBox(height: 8),
          Text(
            '$value',
            style: TextStyle(
                fontSize: 20, fontWeight: FontWeight.w500, color: valuecolor),
          ),
        ],
      ),
    );
  }

  Widget _buildRecentList(
      String title, List<Map<String, dynamic>> items, Color amtcolor) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 10),
        items.isEmpty
            ? const Text('No recent data found',
                style: TextStyle(fontSize: 16, color: Colors.grey))
            : Table(
                border: TableBorder.all(color: Colors.grey),
                columnWidths: const {
                  0: FlexColumnWidth(1),
                  1: FlexColumnWidth(1),
                  2: FlexColumnWidth(1.5),
                  3: FlexColumnWidth(1),
                  4: FlexColumnWidth(1),
                },
                children: [
                  TableRow(
                    decoration: BoxDecoration(color: Colors.grey[200]),
                    children: const [
                      Padding(
                        padding: EdgeInsets.all(8.0),
                        child: Text(
                          'Date',
                          style: TextStyle(fontWeight: FontWeight.bold),
                          textAlign: TextAlign.right,
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.all(8.0),
                        child: Text(
                          'Category',
                          style: TextStyle(fontWeight: FontWeight.bold),
                          textAlign: TextAlign.right,
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.all(8.0),
                        child: Text(
                          'Description',
                          style: TextStyle(fontWeight: FontWeight.bold),
                          textAlign: TextAlign.right,
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.all(8.0),
                        child: Text(
                          'Amount',
                          style: TextStyle(fontWeight: FontWeight.bold),
                          textAlign: TextAlign.right,
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.all(8.0),
                        child: Text(
                          'Pay Method',
                          style: TextStyle(fontWeight: FontWeight.bold),
                          textAlign: TextAlign.right,
                        ),
                      ),
                    ],
                  ),
                  ...items.map((item) {
                    return TableRow(
                      children: [
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text(item['date']?.toString() ?? 'N/A'),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text(item['category']?.toString() ?? 'N/A'),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text(item['description']?.toString() ?? 'N/A'),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text(
                            '\$${item['amount']}',
                            textAlign: TextAlign.right,
                            style: TextStyle(
                              color: amtcolor,
                            ),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text(
                            '\$${item['amount']}',
                            textAlign: TextAlign.right,
                            style: TextStyle(
                              color: amtcolor,
                            ),
                          ),
                        ),
                      ],
                    );
                  }).toList(),
                ],
              ),
      ],
    );
  }

  Widget _buildBottomNavBar() {
    return BottomAppBar(
      shape: const CircularNotchedRectangle(),
      notchMargin: 8.0,
      color: Colors.grey[300],
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            _buildNavItem(Icons.home, 'Home', 0),
            _buildNavItem(Icons.category, 'Category', 1),
            const SizedBox(width: 40),
            _buildNavItem(Icons.analytics, 'Analytics', 2),
            _buildNavItem(Icons.person, 'Profile', 3),
          ],
        ),
      ),
    );
  }

  Widget _buildNavItem(IconData icon, String label, int index) {
    return GestureDetector(
      onTap: () {
        setState(() {
          // Update the index and rebuild the widget
        });
      },
      child: Column(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            icon,
            color: Colors.black,
          ),
          Text(
            label,
            style: const TextStyle(color: Colors.black),
          ),
        ],
      ),
    );
  }

  FloatingActionButton _buildFloatingActionButton() {
    return FloatingActionButton(
      onPressed: () {
        // Add your action for the floating button here
      },
      backgroundColor: Colors.black,
      foregroundColor: Colors.white,
      elevation: 6.0,
      shape: const CircleBorder(
        side: BorderSide(color: Colors.white, width: 2.0),
      ),
      child: const Icon(Icons.add),
    );
  }
}
