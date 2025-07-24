import 'package:flutter/material.dart';

class HomePages extends StatefulWidget {
  final bool isBusinessOwner;
  HomePages({super.key, this.isBusinessOwner = false});

  @override
  State<HomePages> createState() => _HomePagesState();
}

class _HomePagesState extends State<HomePages> {
  int _selectedIndex = 0;

  final List<Map<String, dynamic>> companies = const [
    {
      'logo': Icons.business,
      'name': 'EcoCorp',
      'esg': 85,
    },
    {
      'logo': Icons.factory,
      'name': 'GreenMakers',
      'esg': 78,
    },
    {
      'logo': Icons.energy_savings_leaf,
      'name': 'Solarize',
      'esg': 92,
    },
  ];

  void _showAddESGDialog() {
    final _titleController = TextEditingController();
    final _scoreController = TextEditingController();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Add ESG Report'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: _titleController,
              decoration: const InputDecoration(labelText: 'Report Title'),
            ),
            TextField(
              controller: _scoreController,
              decoration: const InputDecoration(labelText: 'ESG Score'),
              keyboardType: TextInputType.number,
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('ESG Report "${_titleController.text}" added!')),
              );
            },
            child: const Text('Submit'),
          ),
        ],
      ),
    );
  }

  Widget _buildHome() {
    return ListView.builder(
      itemCount: companies.length,
      itemBuilder: (context, index) {
        final company = companies[index];
        return Card(
          margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          child: ListTile(
            leading: Icon(company['logo'], size: 40),
            title: Text(company['name'], style: const TextStyle(fontWeight: FontWeight.bold)),
            subtitle: Text('ESG Score: 0${company['esg']}'),
          ),
        );
      },
    );
  }

  Widget _buildProfile() {
    return const Center(
      child: Text('Profile Page (Coming Soon)', style: TextStyle(fontSize: 18)),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Company List'),
      ),
      body: _selectedIndex == 0 ? _buildHome() : _buildProfile(),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
      ),
      floatingActionButton: widget.isBusinessOwner
          ? FloatingActionButton.extended(
              onPressed: _showAddESGDialog,
              icon: const Icon(Icons.add_chart),
              label: const Text('Add ESG Report'),
              backgroundColor: const Color(0xFFE6FF6A),
              foregroundColor: const Color(0xFF2B3A2B),
            )
          : null,
    );
  }
}
